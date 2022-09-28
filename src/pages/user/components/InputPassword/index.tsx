import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import type { InputProps } from 'antd';
import { Input } from 'antd';
import React from 'react';

// password mask pattern generator
const pointGen = (pattern: string, num: number) => {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(num))
    .map(() => pattern)
    .join('');
};

export type InputPasswordProps = {
  patternPointGen?: string;
  delayPointGen?: number;
  onChange: (unmaskedPassword: string) => void;
} & Omit<InputProps, 'onChange'>;

const InputPassword: React.FC<InputPasswordProps> = (props) => {
  const { patternPointGen, delayPointGen, onChange: onChangeUnmaskedPassword, ...rest } = props;
  const pattern = patternPointGen || '*';
  const delay = delayPointGen || 800;

  // state password is used for rendering mask effect
  const [password, setPassword] = React.useState<string>('');
  const [unmaskedPassword, setUnmaskedPassword] = React.useState<string>('');
  const [visible, setVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setPassword(pointGen(pattern, password.length));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [password, delay, pattern]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newUnmaskedPassword = '';
    let newPassword = '';

    // insert cursor location
    const index = e.target.selectionStart || 0;
    const inputText = e.target.value;

    // increase length of input's value
    const addedTextLength = inputText.length - unmaskedPassword.length;

    // increase text
    if (addedTextLength > 0) {
      const newStr = inputText.slice(index - addedTextLength, index);
      newUnmaskedPassword =
        unmaskedPassword.slice(0, index - addedTextLength) +
        newStr +
        unmaskedPassword.slice(index - addedTextLength);

      // delete text
    } else if (addedTextLength < 0) {
      newUnmaskedPassword =
        unmaskedPassword.slice(0, index) + unmaskedPassword.slice(index - addedTextLength);
    }

    setUnmaskedPassword(newUnmaskedPassword.trim());
    // update form field password
    onChangeUnmaskedPassword(newUnmaskedPassword.trim());

    // render mask effect
    if (inputText.length !== 0) {
      newPassword = pointGen('*', inputText.length - 1) + inputText.charAt(inputText.length - 1);
    }
    setPassword(newPassword.trim());
  };

  const handleToggleVisible = () => {
    setVisible((prev) => !prev);
  };
  return (
    <Input
      {...rest}
      value={visible ? unmaskedPassword : password}
      onChange={handlePasswordChange}
      suffix={
        visible ? (
          <EyeTwoTone onClick={handleToggleVisible} />
        ) : (
          <EyeInvisibleOutlined onClick={handleToggleVisible} />
        )
      }
    />
  );
};

export default InputPassword;
