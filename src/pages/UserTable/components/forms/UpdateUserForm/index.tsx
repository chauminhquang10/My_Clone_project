import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import { message } from 'antd';
import React from 'react';
import NewUserForm from '../NewUserForm';

const handleUpdate = async (
  params: API.updateUserParams,
  body: API.UpdateUserRequest,
  avatar?: File,
) => {
  const hide = message.loading('Loading...');
  hide();
  try {
    const res = await Api.UserController.updateUser(params, body, avatar);
    if (!res.code) return false;

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
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  userInfo,
  isVisibleUpdateUser,
  setIsVisibleUpdateUser,
}) => {
  return (
    <NewUserForm
      title="Chỉnh sửa người dùng"
      width="934px"
      visible={isVisibleUpdateUser}
      onVisibleChange={setIsVisibleUpdateUser}
      onFinish={async (values, avatar) => {
        const success = await handleUpdate({ userId: '' }, { ...values }, avatar);
        return !!success;
      }}
      userInfo={userInfo}
    />
  );
};

export default UpdateUserForm;
