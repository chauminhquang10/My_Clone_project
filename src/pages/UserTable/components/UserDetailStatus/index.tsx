import { Tag } from 'antd';
import styles from './UserDetailStatus.less';

const TAG_COLORS = { ACTIVE: '#D9F7BE', INACTIVE: '#FFCCC7', UNKNOWN: '#F5F5F5' };

const TAG_TITLES = { ACTIVE: 'ĐANG HOẠT ĐỘNG', INACTIVE: 'TẠM KHÓA', UNKNOWN: 'KHÔNG XÁC ĐỊNH' };

const TAG_TITLE_COLORS = { ACTIVE: '#237804', INACTIVE: '#a8071a', UNKNOWN: '#434343' };

const UserDetailStatus: React.FC<{
  status: NonNullable<API.UserDetailResponse['status']>;
}> = ({ status }) => {
  return (
    <Tag className={styles.avatarStatus} color={TAG_COLORS[status]}>
      <span className={styles.avatarTitle} style={{ color: TAG_TITLE_COLORS[status] }}>
        {TAG_TITLES[status]}
      </span>
    </Tag>
  );
};

export default UserDetailStatus;
