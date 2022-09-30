import { Button, Card, Col, Row } from 'antd';

import introduceRowStyles from './IntroduceRow.less';

import BulletProgress from './BulletProgress';
import { getMachineTypeStatistic } from '@/services/STM-APIs/DashboardController';
import { useRequest } from 'umi';
import { useState } from 'react';

type LatestVersionItem = {
  id: number;
  name: string;
  machineType: string;
  modelId: number;
  content: string;
};

type MachineTypeItem = {
  machineType: string;
  total: number;
  latestVersion?: LatestVersionItem;
};

const IntroduceRow = () => {
  // tổng số máy
  const [totalMachines, setTotalMachines] = useState<number>(0);

  // mảng chứa các loại máy
  const [allMachineList, setAllMachineList] = useState<MachineTypeItem[]>([]);

  useRequest<any>(() => getMachineTypeStatistic(), {
    onSuccess(data) {
      setTotalMachines(data?.total);

      const allMachineListArray: MachineTypeItem[] = [];

      Object.keys(data?.statistics).forEach(function (key) {
        if (data?.statistics[key]?.machineType !== 'UNKNOWN')
          allMachineListArray.push(data?.statistics[key]);
      });
      setAllMachineList(allMachineListArray);
    },
    onError(error) {
      console.log('error', error);
    },
  });

  return (
    <>
      <Row gutter={24} align="top">
        <Col span={16}>
          <Row
            className={introduceRowStyles.introduceRow_leftContainer}
            align="middle"
            style={{ gap: '24px' }}
            wrap={false}
          >
            <Col span={4}>
              <Card className={introduceRowStyles.firstCard} bordered={false}>
                <h1 className={introduceRowStyles.firstCard_title}>Total number of machines</h1>
                <span className={introduceRowStyles.firstCard_quantity}>{totalMachines}</span>
              </Card>
            </Col>
            <Col span={20} style={{ flex: '1' }}>
              <Row gutter={20}>
                {allMachineList?.map((machineItem: MachineTypeItem) => {
                  return (
                    <Col span={8} key={machineItem?.machineType}>
                      <Card className={introduceRowStyles.othersCard}>
                        <h1 className={introduceRowStyles.othersCard_title}>
                          Total of {machineItem?.machineType}
                        </h1>
                        <div className={introduceRowStyles.othersCard_quantityContainer}>
                          <span className={introduceRowStyles.othersCard_quantity}>
                            {machineItem?.total}
                          </span>
                          <Button className={introduceRowStyles.othersCard_versionInfo}>
                            <span>Version: {machineItem?.latestVersion?.id}</span>
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ height: '168px', maxHeight: '168px' }}>
          <BulletProgress />
        </Col>
        ;
      </Row>
    </>
  );
};

export default IntroduceRow;
