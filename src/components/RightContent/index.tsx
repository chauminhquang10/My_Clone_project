/* eslint-disable react/no-children-prop */
import { ReactComponent as ENIcon } from '@/assets/icon/en-language-icon.svg';
import { ReactComponent as VIIcon } from '@/assets/icon/vi-language-icon.svg';
import { BellOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';
import { FormattedMessage, getLocale, SelectLang, useModel } from 'umi';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const LANGUAGE_ICON = {
  'en-US': <ENIcon />,
  'vi-VN': <VIIcon />,
};

const SelectedLanguage: React.FC = () => {
  return (
    <div className={styles.selectLanguage}>
      <span>
        <FormattedMessage id="navBar_language" />
      </span>
      {LANGUAGE_ICON[getLocale()]}
    </div>
  );
};

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  console.log('initialState: ', initialState);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space align="center" className={className}>
      <Badge count={5} style={{ borderColor: 'transparent' }} offset={[-3, 5]}>
        <BellOutlined style={{ fontSize: 32, color: '#eee' }} />
      </Badge>
      <AvatarDropdown />
      <SelectLang className={styles.language} icon={<SelectedLanguage />} />
    </Space>
  );
};
export default GlobalHeaderRight;
