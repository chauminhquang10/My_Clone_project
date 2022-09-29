import { ExportIcon } from '@/assets';
import { FormattedMessage } from 'umi';
import style from './style.less';

type ExportFileProps = {
  onClick: () => void;
};

function ExportFile({ onClick }: ExportFileProps) {
  return (
    <button className={style['btn-add']} onClick={onClick}>
      <span className={style['text-add']}>
        <FormattedMessage id="export" />
      </span>
      <img src={ExportIcon} alt="" />
    </button>
  );
}

export default ExportFile;
