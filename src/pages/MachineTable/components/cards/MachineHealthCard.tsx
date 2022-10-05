import { genKey } from '@/utils';
import { Card } from 'antd';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from '../../machineDrawer.less';

type MachineHealthCardProps = {
  health: number | undefined;
};

export default function MachineHealthCard({ health }: MachineHealthCardProps) {
  const intl = useIntl();
  const offset = useMemo(() => (intl.locale === 'vi-VN' ? 4 : 2), [intl]);
  const driveHealth = useMemo(() => (health !== undefined ? health * 100 : 0), [health]);

  const statusPosition: CSSProperties = useMemo(
    () => ({ left: `calc(${driveHealth - offset}% + 1px)` }),
    [driveHealth, offset],
  );

  return (
    <Card
      size="small"
      className={styles.myCard}
      title={<FormattedMessage id="machine-drawer.drive-health" />}
    >
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
            id: 'status',
          })}
        </div>
      </div>
    </Card>
  );
}
