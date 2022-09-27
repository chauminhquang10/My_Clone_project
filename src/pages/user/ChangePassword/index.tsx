import logoKSBank from '@/assets/images/ksbank-logo.svg';
import React from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import styles from './index.less';

const ChangePassword: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logoKSBank} alt="logo-ksbank" />
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePassword;
