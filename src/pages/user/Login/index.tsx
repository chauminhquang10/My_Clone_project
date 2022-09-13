import logoKSBank from '@/assets/images/ksbank-logo.svg';
import { BLOCK_TIME, MAX_LOGIN_TIMES, UserMessageError } from '@/constants';
import Api from '@/services/Stm-controller';
import { openNotification } from '@/utils';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import { InputPassword, SetupPasswordForm } from '../components';

import styles from './index.less';

type SetupPasswordStateType = {
  isOpen: boolean;
  token: string;
};

type dataResponseType = {
  loginTimes: number;
  blockedAt: string;
} & API.AccessTokenResponseCustom;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [setupPasswordState, setSetupPasswordState] = useState<SetupPasswordStateType>({
    isOpen: true,
    token: '',
  });

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    console.log('userInfo: ', userInfo);

    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginRequest) => {
    try {
      const res = await Api.AuthController.login({
        ...values,
      });

      console.log('res: ', res);

      // login thanh cong
      if (res.code === 0) {
        const message = 'Đăng nhập thành công!';
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
        const data = res.data as dataResponseType;
        if (data.loginTimes === MAX_LOGIN_TIMES) {
          const today = new Date();
          const diffTimes = today.getTime() - Date.parse(data?.blockedAt);
          const diffMins = Math.floor((((diffTimes + BLOCK_TIME) % 86400000) % 3600000) / 60000);
          const desc = `Tài khoản bị tạm khóa. Vui lòng quay lại sau ${diffMins} phút.`;
          openNotification('error', UserMessageError[res.code], desc);
        } else {
          const desc = `Tài khoản sẽ tạm khóa trong 30 phút nếu nhập sai 3 lần. Bạn còn ${
            MAX_LOGIN_TIMES - data?.loginTimes
          } lần thử lại.`;
          openNotification('warning', UserMessageError[res.code], desc);
        }
        return;
      }

      // dang nhap mat khau he thong, first time login
      if (res.code === 112) {
        openNotification('warning', UserMessageError[res.code]);
        setSetupPasswordState({
          isOpen: true,
          token: res.data?.token as string,
        });
        return;
      }

      // login sai mat khau 3 lan. tam khoa tai khoan.
      if (res.code === 111) {
        const data = res.data as dataResponseType;
        const today = new Date();
        const diffTimes = today.getTime() - Date.parse(data?.blockedAt);
        const diffMins = Math.floor((((diffTimes + BLOCK_TIME) % 86400000) % 3600000) / 60000);
        const desc = `Tài khoản bị tạm khóa. Vui lòng quay lại sau ${diffMins} phút.`;
        openNotification('error', UserMessageError[res.code], desc);
        return;
      }

      // cac truong hop con lai.
      if (res.code) openNotification('error', UserMessageError[res.code]);
      return;
    } catch (error) {
      console.log('error login: ', error);
      const message = 'Đăng nhập không thành công!';
      openNotification('error', message);
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
          <img src={logoKSBank} alt="logo-ksbank" />
        </div>
        {setupPasswordState.isOpen ? (
          <SetupPasswordForm tokenReset={setupPasswordState.token} />
        ) : (
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
              <Button type="primary" htmlType="submit" form="login-form" loading={isSubmitting}>
                Đăng nhập
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
