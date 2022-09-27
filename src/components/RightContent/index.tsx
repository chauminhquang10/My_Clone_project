import { BellOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';
import React from 'react';
import { FormattedMessage, SelectLang, useModel } from 'umi';
import AvatarDropdown from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const SelectedLanguage: React.FC = () => {
  // const handleChangeLanguage = () => {
  //   const locale = getLocale();
  //   if (!locale || locale === 'vi-VN') {
  //     setLocale('en-US');
  //   } else {
  //     setLocale('vi-VN');
  //   }
  // };
  return (
    <>
      <span role="img" aria-label="China">
        {<FormattedMessage id="navBar_languageIcon" />}
      </span>
      <FormattedMessage id="navBar_language" />
    </>
  );
};

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space align="start" className={className}>
      <Badge count={5} style={{ borderColor: 'transparent' }} offset={[-3, 5]}>
        <BellOutlined style={{ fontSize: 32, color: '#eee' }} />
      </Badge>
      <AvatarDropdown />
      <SelectLang className={styles.action} icon={<SelectedLanguage />} />
    </Space>
  );
};
export default GlobalHeaderRight;
