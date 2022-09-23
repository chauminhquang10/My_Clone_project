import { PlusOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import style from './style.less';

type AddNewProps = {
  enableCreateNew: boolean;
  onClick: () => void;
  text?: string;
  icon?: React.ReactNode;
};

function AddNew({ onClick, enableCreateNew, text, icon }: AddNewProps) {
  return (
    <Tooltip
      placement="left"
      title={enableCreateNew ? '' : 'Tài khoản chưa được cho phép truy cập chức năng này'}
    >
      <button className={style['btn-add']} onClick={onClick} disabled={!enableCreateNew}>
        <span className={style['text-add']}>{text ? text : 'Tạo mới'}</span>
        {icon ? icon : <PlusOutlined className={style.icon} />}
      </button>
    </Tooltip>
  );
}

export default AddNew;
