import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';
import style from './style.less';

type AddNewProps = {
  enableCreateNew: boolean;
  onClick: () => void;
  text?: string;
  icon?: React.ReactNode;
};

function AddNew({ onClick, enableCreateNew, text, icon }: AddNewProps) {
  return (
    <Tooltip placement="left" title={enableCreateNew ? '' : <FormattedMessage id="noAccess" />}>
      <Button
        className={enableCreateNew && style['btn-add']}
        onClick={onClick}
        disabled={!enableCreateNew}
      >
        <span className={style['text-add']}>{text ? text : <FormattedMessage id="create" />}</span>
        {icon ? icon : <PlusOutlined className={style.icon} />}
      </Button>
    </Tooltip>
  );
}

export default AddNew;
