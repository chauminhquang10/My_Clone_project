import { useIntl } from 'umi';
import style from './style.less';

type TotalPaginationProps = {
  total: number;
  range: [number, number];
};

const TotalPagination = ({ total, range }: TotalPaginationProps) => {
  const intl = useIntl();

  return (
    <div className={style['total-box']}>{`${range[0]}-${range[1]} ${intl.formatMessage({
      id: 'pagination.in',
    })} ${total}`}</div>
  );
};

export default TotalPagination;
