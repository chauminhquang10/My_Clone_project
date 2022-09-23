import { PlusOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import style from './style.less';

type AddNewProps = {
  enableCreateNew: boolean;
  onClick: () => void;
};

function AddNew({ onClick, enableCreateNew }: AddNewProps) {
  return (
    <Tooltip
      placement="left"
      title={enableCreateNew ? '' : 'Tài khoản chưa được cho phép truy cập chức năng này'}
    >
      <button className={style['btn-add']} onClick={onClick} disabled={!enableCreateNew}>
        <span className={style['text-add']}>Tạo mới</span>
        <PlusOutlined className={style.icon} />
      </button>
    </Tooltip>
  );
}

export default AddNew;
