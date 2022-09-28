import { updateUser } from '@/services/STM-APIs/UserController';
import { openNotification } from '@/utils';
import { message } from 'antd';
import React from 'react';
import { useIntl } from 'umi';
import NewUserForm from '../NewUserForm';

const handleUpdate = async (params: API.updateUserParams, body: API.UpdateUserRequest) => {
  const hide = message.loading('Loading...');
  hide();
  try {
    const res = await updateUser(params, body);

    if (!res) return false;

    if (res.code === 0) {
      message.success('Cập nhật người dùng thành công');
      return true;
    }

    switch (res.code) {
      case 100:
        openNotification('error', 'Email đã được sử dụng');
        return false;
      case 101:
        openNotification('error', 'Số điện thoại đã được sử dụng');
        return false;
      case 106:
        openNotification('error', 'Mã nhân viên đã được sử dụng');
        return false;
      case 107:
        openNotification('error', 'Email đã được sử dụng');
        return false;
      case 108:
        openNotification('error', 'Người dừng quản lý đã tồn tại');
        return false;
      default:
        message.error('Cập nhật người dùng không thành công, vui lòng thử lại sau!');
        return false;
    }
  } catch (error) {
    hide();
    message.error('Cập nhật người dùng không thành công, vui lòng thử lại sau!');
    return false;
  }
};

interface UpdateUserFormProps {
  userInfo: API.UserDetailResponse;
  isVisibleUpdateUser: boolean;
  setIsVisibleUpdateUser: (isVisible: boolean) => void;
  runGetAllUser: () => void;
  onCloseDrawer: () => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  userInfo,
  isVisibleUpdateUser,
  setIsVisibleUpdateUser,
  runGetAllUser,
  onCloseDrawer,
}) => {
  return (
    <NewUserForm
      title={useIntl().formatMessage({ id: 'userTable.form.title.updateUser' })}
      width="934px"
      visible={isVisibleUpdateUser}
      onVisibleChange={setIsVisibleUpdateUser}
      onFinish={async (values) => {
        const success = await handleUpdate({ userId: userInfo.id as string }, { ...values });

        if (!!success) {
          runGetAllUser();
          onCloseDrawer();
        }

        return !!success;
      }}
      userInfo={userInfo}
    />
  );
};

export default UpdateUserForm;
