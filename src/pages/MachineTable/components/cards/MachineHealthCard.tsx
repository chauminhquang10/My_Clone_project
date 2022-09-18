import { genKey } from '@/utils';
import { Card } from 'antd';
import styles from '../../machineDrawer.less';

export default function MachineHealthCard() {
  return (
    <Card size="small" style={{ borderRadius: 12 }} className={styles.myCard} title="Sức khoẻ máy">
      <div className={styles.statusBar}>
        {Array.from(Array(5)).map((_, i) => (
          <div className={styles[`status-${i + 1}`]} key={genKey()} />
        ))}
      </div>
    </Card>
  );
}
