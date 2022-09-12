import logoKSBank from '@/assets/images/ksbank-logo.svg';
import React from 'react';
import { SetupPasswordForm } from '../components';

import styles from './index.less';

// function isMinimumCharacter(str: string, num: number): boolean {
//   return str.length >= num;
// }

// function isContainLowerCase(str: string): boolean {
//   const len = str.length;
//   for (let i = 0; i < len; i++) {
//     const c = str.charAt(i);
//     if (!isNaN(+c)) continue;
//     if (c.toLowerCase() === c) return true;
//   }

//   return false;
// }

// function isContainUpperCase(str: string): boolean {
//   const len = str.length;
//   for (let i = 0; i < len; i++) {
//     const c = str.charAt(i);
//     if (!isNaN(+c)) continue;
//     if (c.toUpperCase() === c) return true;
//   }

//   return false;
// }

// function isContainNumber(str: string) {
//   return /\d/.test(str);
// }

// function isContainSpecialLetter(str: string) {
//   return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
// }

const Login: React.FC = () => {
  // const [form] = Form.useForm();
  // const [, setUserLoginState] = useState<API.LoginResult>({});

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

  // const handleSubmit = async (values: any) => {
  //   try {
  //     const msg = await Api.AuthController.login({
  //       ...values,
  //     });

  //     if (!msg) {
  //       openNotification('error', 'Đăng nhập không thành công!');
  //       return;
  //     }

  //     if (msg.code === 0) {
  //       const message = 'Đăng nhập thành công!';
  //       openNotification('success', message);

  //       // const currentUser = await getMyProfile();

  //       // console.log('currentUser: ', currentUser);

  //       await fetchUserInfo();
  //       if (!history) return;
  //       const { query } = history.location;
  //       const { redirect } = query as { redirect: string };

  //       console.log('login successful');
  //       // console.log('history: ', history);
  //       return;
  //     }

  //     openNotification('error', msg.message);
  //   } catch (error) {
  //     console.log('error login: ', error);
  //     const message = 'Đăng nhập không thành công!';
  //     openNotification('error', message);
  //   }
  // };

  // const onFinish = async (values: any) => {
  //   await handleSubmit(values as any);
  // };

  // const handlePasswordChange = (password: string) => {
  //   // console.log('is minimum 8 characters: ', isMinimumCharacter(password));
  //   // console.log('is minimum 8 characters: ', isMinimumCharacter(password));
  //   // console.log('is minimum 8 characters: ', isMinimumCharacter(password));
  //   // console.log('is minimum 8 characters: ', isMinimumCharacter(password));
  //   // console.log('is minimum 8 characters: ', isMinimumCharacter(password));

  //   form.setFieldValue('password', password);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logoKSBank} alt="logo-ksbank" />
        </div>
        <SetupPasswordForm />

        {/* <div className={styles['form-wrapper']}>
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
        </div> */}
      </div>
    </div>
  );
};

export default Login;
