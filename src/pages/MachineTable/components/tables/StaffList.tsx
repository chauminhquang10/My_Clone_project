import Api from '@/services/STM-APIs';
import { useRequest } from 'ahooks';
import type { FormInstance } from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useMemo } from 'react';
import { FormattedMessage } from 'umi';

interface UserData extends API.UserResponse {
  index: number;
}

const userColumns: ColumnsType<Pick<UserData, 'name' | 'email' | 'phoneNumber'>> = [
  {
    title: <FormattedMessage id="tableColumn_indexTitle" />,
    align: 'center',
    dataIndex: 'index',
    width: '80px',
  },
  {
    title: (
      <div style={{ textAlign: 'center' }}>
        <FormattedMessage id="fullName" />
      </div>
    ),
    dataIndex: 'name',
    width: '307px',
  },
  {
    title: <div style={{ textAlign: 'center' }}>Email</div>,
    dataIndex: 'email',
    width: '307px',
  },
  {
    title: <FormattedMessage id="phoneNumber" />,
    dataIndex: 'phoneNumber',
    width: '140px',
  },
];

const StaffList = ({ form }: { form: FormInstance }) => {
  const { data } = useRequest(
    () => {
      const promises = (form.getFieldValue('userIds') as string[]).map((userId: string) =>
        Api.UserController.getUser({ userId }).then((res) => res.data),
      );

      return Promise.all(promises).then((values) => values);
    },
    {
      cacheKey: `userDetail-${JSON.stringify(form.getFieldValue('userIds'))}`,
      refreshDeps: [form.getFieldValue('userIds')],
    },
  );

  const dataSource = useMemo(
    () =>
      data?.map((user, i) => ({
        index: i + 1,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        name: user?.name,
      })),
    [data],
  );

  return <Table columns={userColumns} dataSource={dataSource} pagination={false} bordered />;
};

export default StaffList;
