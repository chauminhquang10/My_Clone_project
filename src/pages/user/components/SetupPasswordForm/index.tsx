import iconCheckDisable from '@/assets/icons/icon-check-disable.svg';
import Api from '@/services/Stm-controller';
import { getMyProfile } from '@/services/Stm-controller/UserController';
import { openNotification } from '@/utils';
import { LockOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import InputPassword from '../InputPassword';

import styles from './index.less';

const validationList = [
  {
    id: 0,
    message: 'Mật khẩu tối thiểu 08 ký tự',
  },
  {
    id: 1,
    message: 'Chữ thường',
  },
  {
    id: 2,
    message: 'Chữ cái HOA',
  },
  {
    id: 3,
    message: 'Chữ số',
  },
  {
    id: 4,
    message: ' Ký tự đặc biệt',
  },
];

const SetupPasswordForm: React.FC = () => {
  const [form] = Form.useForm();
  // const [, setUserLoginState] = useState<API.LoginResult>({});F

  // const { initialState, setInitialState } = useModel('@@initialState');

  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   if (userInfo) {
  //     await setInitialState((s) => ({
  //       ...s,
  //       currentUser: userInfo,
  //     }));
  //   }
  // };

  const [validationPassword, setValidationPassword] = useState([
    {
      id: 0,
      check: false,
    },
    {
      id: 1,
      check: false,
    },
    {
      id: 2,
      check: false,
    },
    {
      id: 3,
      check: false,
    },
    {
      id: 4,
      check: false,
    },
  ]);

  const handleSubmit = async (values: any) => {
    try {
      const msg = await Api.AuthController.login({
        ...values,
      });

      console.log('msg: ', msg);

      if (!msg) {
        openNotification('error', 'Đăng nhập không thành công!');
        return;
      }

      if (msg.code === 0) {
        const message = 'Đăng nhập thành công!';
        openNotification('success', message);

        const currentUser = await getMyProfile();

        console.log('currentUser: ', currentUser);

        // await fetchUserInfo();
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }

      openNotification('error', msg.message);
    } catch (error) {
      console.log('error login: ', error);
      const message = 'Đăng nhập không thành công!';
      openNotification('error', message);
    }
  };

  const onFinish = async (values: any) => {
    await handleSubmit(values as any);
  };

  console.log('validation: ', validationPassword);

  const handlePasswordChange = (password: string) => {
    console.log('password change: ', password);

    if (password.length >= 8) {
      setValidationPassword((prev) => {
        const result = prev.map((item) => {
          if (item.id === 0)
            return {
              id: 0,
              check: true,
            };

          return { ...item };
        });

        return [...result];
      });
    }

    form.setFieldValue('password', password);
  };

  console.log('password: ', form.getFieldValue('password'));

  return (
    <div className={styles['setup-password-form-wrapper']}>
      <h1 className={styles.title}>Thiết lập mật khẩu</h1>
      <Form
        form={form}
        name="set-password-form"
        onFinish={onFinish}
        className={styles.form}
        layout="vertical"
        validateTrigger="onFinish"
      >
        <Form.Item
          name="password"
          label="Mật khẩu mới"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
        >
          <InputPassword
            onChange={handlePasswordChange}
            placeholder="Nhập mật khẩu"
            prefix={<LockOutlined />}
          />
          <div className={styles['section-validate']}>
            {validationList.map((item) => (
              <li key={item.id} className={styles['item-validate']}>
                <img src={iconCheckDisable} alt="icon-check" />
                <span>{item.message}</span>
              </li>
            ))}
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          label="Xác nhận mật khẩu"
          rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu!' }]}
        >
          <InputPassword
            onChange={handlePasswordChange}
            placeholder="Nhập lại mật khẩu"
            prefix={<LockOutlined />}
          />
        </Form.Item>
      </Form>
      <div className={styles['btn-submit']}>
        <Button type="primary" htmlType="submit" form="login-form">
          Hoàn tất
        </Button>
      </div>
    </div>
  );
};

export default SetupPasswordForm;
