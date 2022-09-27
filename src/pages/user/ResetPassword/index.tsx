import logoKSBank from '@/assets/images/ksbank-logo.svg';
import React from 'react';
import { history } from 'umi';
import { SetupPasswordForm } from '../components';
import styles from './index.less';

const ResetPassword: React.FC = () => {
  const { query } = history.location;
  const token = (query?.token as string).replace(' ', '+');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logoKSBank} alt="logo-ksbank" />
        </div>
        <SetupPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPassword;
