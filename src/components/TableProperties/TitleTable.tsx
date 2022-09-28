import searchIcon from '@/assets/images/svg/icon/search-icon.svg';
import { Input } from 'antd';
import { useIntl } from 'umi';
import style from './style.less';

type TitleTableProps = {
  children: string | React.ReactElement;
};

function TitleTable({ children }: TitleTableProps) {
  return (
    <div className={style['title-table']}>
      <h1 className={style.title}>{children}</h1>
      <Input
        className={style['input-box']}
        placeholder={useIntl().formatMessage({ id: 'searchBar_placeholder' })}
        prefix={<img className={style.icon} src={searchIcon} alt="" />}
      />
    </div>
  );
}

export default TitleTable;
