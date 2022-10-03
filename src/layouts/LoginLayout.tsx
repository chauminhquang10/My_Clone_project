import { LanguageSwitch } from '@/components/RightContent';
import ProLayout from '@ant-design/pro-layout';
import cx from 'classnames';
import type { BasicLayoutProps } from './BaseLayout';
import styles from './layouts.less';

export default function LoginLayout({ children, routes, ...props }: BasicLayoutProps) {
  return (
    <ProLayout
      {...props}
      footerRender={false}
      menuRender={false}
      className={styles.loginLayout}
      headerRender={() => {
        return (
          <div className={cx(styles.stmHeader, styles.loginHeader)}>
            <div />
            <LanguageSwitch className={styles.intl} />
          </div>
        );
      }}
      disableContentMargin
    >
      {children}
    </ProLayout>
  );
}
