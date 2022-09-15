import logoKSBank from '@/assets/images/ksbank-logo.svg';
import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { SetupPasswordForm } from '../components';
import styles from './index.less';

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(true);

  const handleSubmit = async (values: { email: string }) => {
    console.log('values forgot password: ', values.email);

    if (!history) return;
    history.push('/user/login');
  };

  const onFinish = async (values: { email: string }) => {
    setIsSubmitting(true);
    await handleSubmit(values);
    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logoKSBank} alt="logo-ksbank" />
        </div>

        {isForgotPassword ? (
          <div className={styles['form-wrapper']}>
            <h1 className={styles.title}>Nhập địa chỉ email</h1>
            <Form
              form={form}
              name="forgot-password-form"
              onFinish={onFinish}
              className={styles.form}
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                className={styles['form-username']}
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ email' }]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
            </Form>
            <div className={styles['btn-submit']}>
              <Button
                type="primary"
                htmlType="submit"
                form="forgot-password-form"
                loading={isSubmitting}
              >
                Hoàn tất
              </Button>
            </div>
          </div>
        ) : (
          <SetupPasswordForm
            handleOpen={(isOpenForm: boolean) => setIsForgotPassword(!isOpenForm)}
          />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
