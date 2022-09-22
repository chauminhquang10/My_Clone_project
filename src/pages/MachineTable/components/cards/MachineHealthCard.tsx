import { genKey } from '@/utils';
import { Card } from 'antd';
import styles from '../../machineDrawer.less';

type MachineHealthCardProps = {
  health: number | undefined;
};

export default function MachineHealthCard({ health }: MachineHealthCardProps) {
  console.log(health);
  return (
    <Card size="small" style={{ borderRadius: 12 }} className={styles.myCard} title="Sức khoẻ máy">
      <div className={styles.statusBar}>
        {Array.from(Array(5)).map((_, i) => (
          <div className={`${styles[`status-${i + 1}`]} ${i === styles.active}`} key={genKey()} />
        ))}
      </div>
    </Card>
  );
}
