import okIcon from '@/assets/icons/ok-icon.svg';
import lowIcon from '@/assets/icons/low-icon.svg';
import fullIcon from '@/assets/icons/full-icon.svg';
import style from './style.less';
type StorageStatusProps = {
  type:
    | 'UNKNOWN'
    | 'OK'
    | 'EMPTY'
    | 'FULL'
    | 'HIGHT'
    | 'LOW'
    | 'INOP'
    | 'MISSING'
    | 'NOVAL'
    | 'NOREF'
    | 'MANIP'
    | 'JAMMED'
    | undefined;
};

function StorageStatus({ type }: StorageStatusProps) {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (type) {
    case 'OK':
      return (
        <div className={style['statustag-box']}>
          <img src={okIcon} alt="" />
          <span>BÌNH THƯỜNG</span>
        </div>
      );
    case 'HIGHT' || 'FULL':
      return (
        <div className={style['statustag-box']}>
          <img src={fullIcon} alt="" />
          <span>ĐẦY</span>
        </div>
      );
    default:
      return (
        <div className={style['statustag-box']}>
          <img src={lowIcon} alt="" />
          <span>THẤP</span>
        </div>
      );
  }
}

export default StorageStatus;
