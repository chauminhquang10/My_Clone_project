import logoKSBank from '@/assets/images/utmc-logo.png';
import { BLOCK_TIME, INITIAL_ROLES, MAX_LOGIN_TIMES, USER_MESSAGE_ERROR } from '@/constants';
import Api from '@/services/STM-APIs';
import { objectKeys, openNotification } from '@/utils';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import { InputPassword } from '../components';
import styles from './index.less';

type DataResponseType = {
  loginTimes: number;
  blockedAt: string;
} & API.AccessTokenResponseCustom;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    const roles = { ...INITIAL_ROLES };

    if (userInfo) {
      if (userInfo?.admin) {
        objectKeys(roles).forEach(function (key) {
          roles[key] = true;
        });
      } else {
        userInfo?.roleGroup?.actions?.forEach((eachAction) => {
          if ((eachAction?.action as string) in roles) {
            roles[eachAction?.action as string] = true;
          }
        });
      }

      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
        currentRoles: roles,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginRequest) => {
    try {
      const res = await Api.AuthController.login({
        username: values.username.trim(),
        password: values.password.trim(),
      });

      // login thanh cong
      if (res.code === 0) {
        const message = 'Login successfully!';
        openNotification('success', message);

        await fetchUserInfo();

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }

      // login sai mat khau tu 1 -> 2 lan
      if (res.code === 105) {
        const data = res.data as DataResponseType;
        if (data.loginTimes === MAX_LOGIN_TIMES) {
          const today = new Date();
          const diffTimes = today.getTime() - Date.parse(data?.blockedAt);
          const diffMins = Math.floor((((diffTimes + BLOCK_TIME) % 86400000) % 3600000) / 60000);
          const desc = `Account is temporarily locked. Please come back after ${diffMins} minutes.`;
          openNotification('error', USER_MESSAGE_ERROR[res.code], desc);
        } else {
          const desc = `Account will be temporarily locked for 30 minutes if entered incorrectly 3 times. You still ${
            MAX_LOGIN_TIMES - data?.loginTimes
          } times.`;
          openNotification('warning', USER_MESSAGE_ERROR[res.code], desc);
        }
        return;
      }

      // dang nhap mat khau he thong, first time login
      if (res.code === 112) {
        openNotification('warning', USER_MESSAGE_ERROR[res.code]);
        if (!history) return;
        history.push({
          pathname: '/user/reset-password',
          query: {
            token: res.data?.token as string,
          },
        });
        return;
      }

      // login sai mat khau 3 lan. tam khoa tai khoan.
      if (res.code === 111) {
        const data = res.data as DataResponseType;
        const today = new Date();
        const diffTimes = today.getTime() - Date.parse(data?.blockedAt);
        const diffMins = Math.floor((((diffTimes + BLOCK_TIME) % 86400000) % 3600000) / 60000);
        const desc = `Account is temporarily locked. Please come back after ${diffMins} minutes.`;
        openNotification('error', USER_MESSAGE_ERROR[res.code], desc);
        return;
      }

      // cac truong hop con lai.
      if (res.code) openNotification('error', USER_MESSAGE_ERROR[res.code], 'Vui lòng thử lại sau');
    } catch (error) {
      console.log('error login: ', error);
      const message = 'Log in failure!';
      openNotification('error', message, error as string);
    }
  };

  const onFinish = async (values: API.LoginRequest) => {
    setIsSubmitting(true);
    await handleSubmit(values);
    setIsSubmitting(false);
  };

  const handlePasswordChange = (password: string) => {
    form.setFieldValue('password', password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logoKSBank} width="70%" alt="logo-ksbank" style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles['form-wrapper']}>
          <h1 className={styles.title}>Login</h1>
          <Form
            form={form}
            name="login-form"
            onFinish={onFinish}
            className={styles.form}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="Username"
              className={styles['form-username']}
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input placeholder="Admin" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <InputPassword
                onChange={handlePasswordChange}
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <div className={styles['forgot-password']}>
              <a href="/user/forgot-password">Forgot password?</a>
            </div>
          </Form>
          <div className={styles['btn-submit']}>
            <Button type="primary" htmlType="submit" form="login-form" loading={isSubmitting}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
