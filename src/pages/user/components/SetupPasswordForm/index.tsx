import iconCheckActive from '@/assets/icons/icon-check-active.svg';
import iconCheckDisable from '@/assets/icons/icon-check-disable.svg';
import Api from '@/services/STM-APIs';
import {
  isContainLowerCase,
  isContainNumber,
  isContainSpecialLetter,
  isContainUpperCase,
  isMinimumCharacter,
  openNotification,
} from '@/utils';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import InputPassword from '../InputPassword';
import styles from './index.less';
import { history } from 'umi';

const validationList = [
  {
    id: 0,
    message: 'Password minimum 8 characters',
    checkFunction: (str: string) => isMinimumCharacter(str, 8),
  },
  {
    id: 1,
    message: 'Lowercase letters',
    checkFunction: isContainLowerCase,
  },
  {
    id: 2,
    message: 'Uppercase letters',
    checkFunction: isContainUpperCase,
  },
  {
    id: 3,
    message: 'Number',
    checkFunction: isContainNumber,
  },
  {
    id: 4,
    message: 'Special characters',
    checkFunction: isContainSpecialLetter,
  },
];

type FormSetupPasswordType = {
  password: string;
  retypePassword: string;
};

const SetupPasswordForm: React.FC<{ token?: string }> = ({ token }) => {
  const [form] = Form.useForm();
  const [newPassword, setNewPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    const message = 'Are you sure you want to leave? All provided data will be lost.';
    e.returnValue = message;
    return message;
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = async (values: API.ResetPasswordRequest) => {
    try {
      const res = await Api.AuthController.resetPassword({
        ...values,
      });

      // reset password successfull
      if (res.code === 0) {
        const message = 'Thiết lập mật khẩu thành công!';
        const desc = 'Vui lòng đăng nhập lại để tiếp tục';
        openNotification('success', message, desc);
        if (!history) return;
        history.push('/user/login');
        return;
      }

      const message = 'Thiết lập mật khẩu không thành công!';
      openNotification('error', message, res.message);
    } catch (error) {
      console.log('error login: ', error);
      const message = 'Thiết lập mật khẩu không thành công!';
      openNotification('error', message, error as string);
    }
  };

  const onFinish = async (values: FormSetupPasswordType) => {
    if (!token) {
      const message = 'Thiết lặp mật khẩu không thành công';
      const desc = 'Vui lòng thử lại';
      openNotification('error', message, desc);
      return;
    }

    // compare password and retype password
    if (values.password !== values.retypePassword) {
      const message = 'Mật khẩu không trùng nhau';
      const desc = 'Vui lòng thiết lập lại mật khẩu';
      openNotification('error', message, desc);
      return;
    }

    setIsSubmitting(true);
    await handleSubmit({
      token,
      password: values.password,
    });
    setIsSubmitting(false);
  };

  const handleNewPasswordChange = (password: string) => {
    setNewPassword(password);
    form.setFieldValue('password', password);
  };

  const handleRetypePasswordChange = (password: string) => {
    form.setFieldValue('retypePassword', password);
  };

  return (
    <div className={styles['setup-password-form-wrapper']}>
      <h1 className={styles.title}>Set up password</h1>
      <Form
        form={form}
        name="set-password-form"
        onFinish={onFinish}
        className={styles.form}
        layout="vertical"
      >
        <Form.Item
          name="password"
          label="New password"
          rules={[{ required: true, message: 'Please enter new password' }]}
        >
          <InputPassword
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <div className={styles['section-validate']}>
          {validationList.map((item) => (
            <li key={item.id} className={styles['item-validate']}>
              <img
                src={item.checkFunction(newPassword) ? iconCheckActive : iconCheckDisable}
                alt="icon-check"
              />
              <span>{item.message}</span>
            </li>
          ))}
        </div>
        <Form.Item
          name="retypePassword"
          label="Retype password"
          rules={[{ required: true, message: 'Please confirm your password' }]}
        >
          <InputPassword
            onChange={handleRetypePasswordChange}
            placeholder="Nhập lại mật khẩu"
            prefix={<LockOutlined />}
          />
        </Form.Item>
      </Form>
      <div className={styles['btn-submit']}>
        <Button
          type="primary"
          htmlType="submit"
          form="set-password-form"
          disabled={!validationList.every((item) => item.checkFunction(newPassword))}
          loading={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default SetupPasswordForm;
