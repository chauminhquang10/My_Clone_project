// import { Button } from '@/components/Common';
import { Button, Form, Input, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import styles from './index.less';

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );

// const Login: React.FC = () => {
//   const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
//   const [type, setType] = useState<string>('account');
//   const { initialState, setInitialState } = useModel('@@initialState');

//   const intl = useIntl();

//   const fetchUserInfo = async () => {
//     const userInfo = await initialState?.fetchUserInfo?.();
//     if (userInfo) {
//       await setInitialState((s) => ({
//         ...s,
//         currentUser: userInfo,
//       }));
//     }
//   };

//   const handleSubmit = async (values: API.LoginParams) => {
//     try {
//       // 登录
//       const msg = await login({ ...values, type });
//       if (msg.status === 'ok') {
//         const defaultLoginSuccessMessage = intl.formatMessage({
//           id: 'pages.login.success',
//           defaultMessage: '登录成功！',
//         });
//         message.success(defaultLoginSuccessMessage);
//         await fetchUserInfo();
//         /** 此方法会跳转到 redirect 参数所在的位置 */
//         if (!history) return;
//         const { query } = history.location;
//         const { redirect } = query as { redirect: string };
//         history.push(redirect || '/');
//         return;
//       }
//       console.log(msg);
//       // 如果失败去设置用户错误信息
//       setUserLoginState(msg);
//     } catch (error) {
//       const defaultLoginFailureMessage = intl.formatMessage({
//         id: 'pages.login.failure',
//         defaultMessage: '登录失败，请重试！',
//       });
//       message.error(defaultLoginFailureMessage);
//     }
//   };
//   const { status, type: loginType } = userLoginState;

//   return (
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <LoginForm
//           logo={<img alt="logo" src={logoKSBank} height={80} />}
//           initialValues={{
//             autoLogin: true,
//           }}
//           onFinish={async (values) => {
//             await handleSubmit(values as API.LoginParams);
//           }}
//           className={styles.form}
//         >
//           {status === 'error' && loginType === 'account' && (
//             <LoginMessage
//               content={intl.formatMessage({
//                 id: 'pages.login.accountLogin.errorMessage',
//                 defaultMessage: '账户或密码错误(admin/ant.design)',
//               })}
//             />
//           )}
//           {type === 'account' && (
//             <>
//               <ProFormText
//                 name="username"
//                 label="Tên đăng nhập"
//                 fieldProps={{
//                   size: 'large',
//                   prefix: <UserOutlined className={styles.prefixIcon} />,
//                 }}
//                 placeholder="Admin"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Vui lòng nhập tên đăng nhập!',
//                   },
//                 ]}
//               />
//               <div style={{ width: '100%' }}>
//                 <ProFormText.Password
//                   name="password"
//                   label="Mật khẩu"
//                   fieldProps={{
//                     size: 'large',
//                     prefix: <LockOutlined className={styles.prefixIcon} />,
//                   }}
//                   placeholder="Nhập mật khẩu"
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Vui lòng nhập mật khẩu!',
//                     },
//                   ]}
//                   style={{ marginBottom: '12px' }}
//                 />
//                 <div className={styles.footer}>
//                   <a>Quên mật khẩu?</a>
//                 </div>
//                 <Button type="primary">Đăng nhập</Button>
//               </div>
//             </>
//           )}
//         </LoginForm>
//       </div>
//     </div>
//   );
// };

// export default Login;

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  return (
    <div className={styles.container}>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
