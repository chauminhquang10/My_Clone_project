import logoKSBank from '@/assets/images/ksbank-logo.svg';
import { requestResetPassword } from '@/services/STM-APIs/AuthController';
import { openNotification, validateEmail } from '@/utils';
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
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isAllowSubmit, setIsAllowSubmit] = useState<boolean>(false);

  const handleSubmit = async (values: { email: string }) => {
    try {
      const res = await requestResetPassword({ ...values });

      if (res.code !== 0) {
        openNotification('error', res.message || 'Có lỗi đã xảy ra');
        return;
      }

      openNotification('success', 'Vui lòng kiểm tra email để đặt lại mật khẩu');
    } catch (error) {
      console.log('error: ', error);
      openNotification('error', 'Có lỗi đã xảy ra');
      return;
    }

    if (!history) return;
    history.push('/user/login');
  };

  const onFinish = async (values: { email: string }) => {
    const isValid = validateEmail(values.email);
    setIsValidEmail(isValid);

    if (!isValid) {
      openNotification('error', 'Email không hợp lệ');
      return;
    }

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
              onChange={() => {
                if (form.getFieldValue('email')) setIsAllowSubmit(true);
                else setIsAllowSubmit(false);
              }}
            >
              <Form.Item
                name="email"
                label="Email"
                className={styles['form-username']}
                validateStatus={isValidEmail ? 'success' : 'error'}
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
                disabled={!isAllowSubmit}
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
