import { Tag } from 'antd';
import { useIntl } from 'umi';
import styles from './UserDetailStatus.less';

const TAG_COLORS = { ACTIVE: '#D9F7BE', INACTIVE: '#FFCCC7', UNKNOWN: '#F5F5F5' };

const TAG_TITLE_COLORS = { ACTIVE: '#237804', INACTIVE: '#a8071a', UNKNOWN: '#434343' };

const UserDetailStatus: React.FC<{
  status: NonNullable<API.UserDetailResponse['status']>;
}> = ({ status }) => {
  const TAG_TITLES = {
    ACTIVE: useIntl().formatMessage({ id: 'userDetailStatus.active' }),
    INACTIVE: useIntl().formatMessage({ id: 'userDetailStatus.inActive' }),
    UNKNOWN: useIntl().formatMessage({ id: 'userDetailStatus.unknown' }),
  };

  return (
    <Tag className={styles.avatarStatus} color={TAG_COLORS[status]}>
      <span className={styles.avatarTitle} style={{ color: TAG_TITLE_COLORS[status] }}>
        {TAG_TITLES[status]}
      </span>
    </Tag>
  );
};

export default UserDetailStatus;
