import iconCheckActive from '@/assets/icons/icon-check-active.svg';
import iconCheckDisable from '@/assets/icons/icon-check-disable.svg';
import Api from '@/services/Stm-controller';
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

const validationList = [
  {
    id: 0,
    message: 'Mật khẩu tối thiểu 08 ký tự',
    checkFunction: (str: string) => isMinimumCharacter(str, 8),
  },
  {
    id: 1,
    message: 'Chữ thường',
    checkFunction: isContainLowerCase,
  },
  {
    id: 2,
    message: 'Chữ cái HOA',
    checkFunction: isContainUpperCase,
  },
  {
    id: 3,
    message: 'Chữ số',
    checkFunction: isContainNumber,
  },
  {
    id: 4,
    message: ' Ký tự đặc biệt',
    checkFunction: isContainSpecialLetter,
  },
];

type FormSetupPasswordType = {
  password: string;
  retypePassword: string;
};

const SetupPasswordForm: React.FC<{ handleOpen: (isOpen: boolean) => void }> = ({ handleOpen }) => {
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

        handleOpen(false);
        return;
      }

      const message = 'Thiết lập mật khẩu không thành công!';
      openNotification('error', message, res.message);
    } catch (error) {
      console.log('error login: ', error);
      const message = 'Thiết lập mật khẩu không thành công!';
      openNotification('error', message, error as string);
    }

    localStorage.removeItem('tokenResetPassword');
  };

  const onFinish = async (values: FormSetupPasswordType) => {
    const tokenResetPassword = localStorage.getItem('tokenResetPassword');

    if (!tokenResetPassword) {
      const message = 'Thiết lặp mật khẩu không thành công';
      const desc = 'Vui lòng thử lại';
      openNotification('error', message, desc);

      handleOpen(false);
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
      token: tokenResetPassword as string,
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
      <h1 className={styles.title}>Thiết lập mật khẩu</h1>
      <Form
        form={form}
        name="set-password-form"
        onFinish={onFinish}
        className={styles.form}
        layout="vertical"
      >
        <Form.Item
          name="password"
          label="Mật khẩu mới"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
        >
          <InputPassword
            onChange={handleNewPasswordChange}
            placeholder="Nhập mật khẩu"
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
          label="Xác nhận mật khẩu"
          rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
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
          Hoàn tất
        </Button>
      </div>
    </div>
  );
};

export default SetupPasswordForm;
