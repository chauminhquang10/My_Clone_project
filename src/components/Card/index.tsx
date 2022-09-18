import type { CardProps } from 'antd';
import cx from 'classnames';
import styles from './card.less';

export default function Card(props: CardProps) {
  return <Card {...props} className={cx(props.className, styles.card)} />;
}
