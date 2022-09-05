import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';
import React from 'react';
import styles from './index.less';

const StmButtonTypes = ['stm-primary', 'stm-ghost'];

export type BaseButtonProps = {
  icon?: React.ReactNode;
  type?: ButtonType | typeof StmButtonTypes[number];
  loading?:
    | boolean
    | {
        delay?: number;
      };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  onClick?: (value?: string) => void;
} & Omit<ButtonProps, 'shape' | 'type'>;

const ButtonCustom: React.FC<BaseButtonProps> = (props) => {
  const { type, className, ...rest } = props;

  const isStmButtonType = StmButtonTypes.includes(type as string) || false;

  return (
    <Button
      {...rest}
      type={!isStmButtonType ? (type as ButtonType) : undefined}
      className={`${styles['stm-ant-btn-primary']} ${className || ''}`}
    />
  );
};

export default ButtonCustom;
