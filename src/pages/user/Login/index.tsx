import logoKSBank from '@/assets/images/ksbank-logo.svg';
import Api from '@/services/Stm-controller';
import { openNotification } from '@/utils';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import { InputPassword } from '../components';

import styles from './index.less';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [, setUserLoginState] = useState<API.LoginResult>({});
  const [type] = useState<string>('account');

  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const msg = await Api.AuthController.login({ ...values, type });
      if (msg.data) {
        const message = 'Đăng nhập thành công!';
        const description =
          'Proactively incubate innovative processes for high-payoff architectures. Globally benchmark flexible.';
        openNotification('success', message, description);
        await fetchUserInfo();
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      openNotification('error', 'Đăng nhập không thành công', '');
      setUserLoginState(msg);
    } catch (error) {
      console.log('error login: ', error);
      const message = 'Đăng nhập không thành công!';
      const description =
        'Proactively incubate innovative processes for high-payoff architectures. Globally benchmark flexible.';
      openNotification('error', message, description);
    }
  };

  const onFinish = async (values: any) => {
    console.log('values: ', values);

    await handleSubmit(values as any);
  };

  const handlePasswordChange = (password: string) => {
    form.setFieldValue('password', password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logoKSBank} alt="logo-ksbank" />
        </div>
        <div className={styles['form-wrapper']}>
          <h1 className={styles.title}>Đăng nhập</h1>
          <Form
            form={form}
            name="login-form"
            onFinish={onFinish}
            className={styles.form}
            layout="vertical"
            validateTrigger="onFinish"
          >
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              className={styles['form-username']}
              rules={[{ required: true, message: 'Tên đăng nhập là bắt buộc nhập' }]}
            >
              <Input placeholder="Admin" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Mật khẩu là bắt buộc nhập' }]}
            >
              <InputPassword
                onChange={handlePasswordChange}
                placeholder="Nhập mật khẩu"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <div className={styles['forgot-password']}>
              <a href="">Quên mật khẩu?</a>
            </div>
          </Form>
          <div className={styles['btn-submit']}>
            <Button type="primary" htmlType="submit" form="login-form">
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
