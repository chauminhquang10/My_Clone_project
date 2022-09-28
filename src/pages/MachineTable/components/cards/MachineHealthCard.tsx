import { genKey } from '@/utils';
import { Card } from 'antd';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { useIntl } from 'umi';
import styles from '../../machineDrawer.less';

type MachineHealthCardProps = {
  health: number | undefined;
};

export default function MachineHealthCard({ health }: MachineHealthCardProps) {
  const intl = useIntl();
  const statusPosition: CSSProperties = useMemo(
    () => ({ left: `calc(${health || 50 - 4}% + 1px)` }),
    [health],
  );

  return (
    <Card size="small" className={styles.myCard} title="Sức khoẻ máy">
      <div className={styles.statusBar}>
        {Array.from(Array(5)).map((_, i) => (
          <div className={`${styles[`status-${i + 1}`]} ${i === styles.active}`} key={genKey()} />
        ))}
      </div>
      <div className={styles.status} style={statusPosition}>
        <div className={styles.needle} />
        <div className={styles.statusText}>
          {intl.formatMessage({
            defaultMessage: 'Tình trạng',
            id: 'machine.detail.machineHealth',
          })}
        </div>
      </div>
    </Card>
  );
}
