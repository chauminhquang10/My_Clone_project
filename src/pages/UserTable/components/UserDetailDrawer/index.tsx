import Api from '@/services/STM-APIs';
import { openNotification } from '@/utils';
import { Drawer, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import {
  Header,
  MachineListRow,
  ManagementUnitRow,
  RoleGroupRow,
  UserInfoRow,
  UserStatusRow,
} from './components';
import styles from './UserDetailDrawer.less';

type UserRole = {
  roleName: string;
  roleDetails: string[];
};

type UserDrawerProps = {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  currentRow: API.UserResponse | undefined;
  setCurrentRow?: (value: API.UserResponse | undefined) => void;
  roles?: UserRole[];
  children?: React.ReactNode;
  runGetAllUser: () => void;
  isPersonalProfile?: boolean;
};

const UserDetailDrawer: React.FC<UserDrawerProps> = ({
  showDetail,
  setShowDetail,
  currentRow,
  setCurrentRow,
  isPersonalProfile = false,
  runGetAllUser,
}) => {
  const [userInfo, setUserInfo] = useState<API.UserDetailResponse>({});

  const { run: runDetailUser } = useRequest(
    (params: API.getUserParams) => Api.UserController.getUser(params),
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          openNotification('error', 'Đã xảy ra lỗi', 'Vui lòng thử lại sau');
          return;
        }
        return res;
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    const getDetailUser = async () => {
      if (currentRow?.id) {
        const res = await runDetailUser({ userId: currentRow.id });

        setUserInfo(res || {});
      }
    };

    getDetailUser();
  }, [currentRow, currentRow?.id, runDetailUser]);

  return (
    <>
      <Drawer
        width={880}
        open={showDetail}
        onClose={() => {
          if (!!setCurrentRow) setCurrentRow(undefined);
          setShowDetail(false);
        }}
        className={styles.myDrawer}
        closable={true}
        headerStyle={{ border: 'none' }}
      >
        {currentRow?.name && (
          <Form layout="vertical" hideRequiredMark>
            {/* Header */}
            <Header
              userInfo={userInfo}
              runGetAllUser={runGetAllUser}
              onCloseDrawer={() => setShowDetail(false)}
              isPersonalProfile={isPersonalProfile}
            />
            {/* page thai nguoi dung */}
            <UserStatusRow avatar={userInfo.avatar} status={userInfo.status} />
            <Row gutter={[0, 24]}>
              {/* Thong tin nguoi dung */}
              <UserInfoRow
                staffId={userInfo.staffId}
                name={userInfo.name}
                phoneNumber={userInfo.phoneNumber}
                email={userInfo.email}
              />
              {/* Don vi quan ly */}
              <ManagementUnitRow
                code={userInfo.managementUnit?.code}
                name={userInfo.managementUnit?.name}
                address={userInfo.managementUnit?.address}
              />
              {/* Nhom quyen so huu */}
              <RoleGroupRow {...userInfo.roleGroup} />
              {/* Danh sach may quan ly */}
              <MachineListRow machines={userInfo.machines} />
              {/* Lich su */}
              {/* <HistoryRow /> */}
            </Row>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default UserDetailDrawer;
