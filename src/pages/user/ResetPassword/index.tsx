import logoKSBank from '@/assets/images/utmc-logo.png';
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
          <img src={logoKSBank} width="70%" alt="logo-ksbank" style={{ objectFit: 'cover' }} />
        </div>
        <SetupPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPassword;
