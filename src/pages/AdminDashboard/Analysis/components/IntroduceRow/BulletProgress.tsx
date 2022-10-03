import { getUserStatistic } from '@/services/STM-APIs/DashboardController';
import { Bullet } from '@ant-design/plots';
import { Card, Col, Row } from 'antd';
import { useState } from 'react';
import { useRequest } from 'umi';

import styles from '../../style.less';

import introduceRowStyles from './IntroduceRow.less';

type UserTypeItem = {
  status: string;
  total: number;
};

type TooltipItem = {
  readonly data: Record<string, any>;

  readonly mappingData: Record<string, any>;

  readonly name: string;

  readonly value: string | number;

  readonly color: string;

  readonly marker: string;
};

const BulletChartColors = {
  ACTIVE: 'legendCircleShape_active',
  INACTIVE: 'legendCircleShape_inActive',
};

const BulletProgress = () => {
  // tổng số máy
  const [totalUsers, setTotalUsers] = useState<number>(0);

  // mảng chứa các loại máy
  const [allUserList, setAllUserList] = useState<UserTypeItem[]>([]);

  // mảng chứa các giá trị total của từng loại user
  const [userTotalValueArray, setUserTotalValueArray] = useState<number[]>([]);

  useRequest<any>(() => getUserStatistic(), {
    onSuccess(data) {
      setTotalUsers(data?.total);

      const allUserListArray: UserTypeItem[] = [];

      Object.keys(data?.statistics).forEach(function (key) {
        if (data?.statistics[key]?.status !== 'UNKNOWN')
          allUserListArray.push(data?.statistics[key]);
      });

      const getAllUserTotalValueArray = allUserListArray?.map((user) => user?.total);
      setUserTotalValueArray(getAllUserTotalValueArray);

      setAllUserList(allUserListArray);
    },
    onError(error) {
      console.log('error', error);
    },
  });

  const handleFormatData = (originalItems: TooltipItem[]) => {
    const results = originalItems.map((item, index) => {
      return {
        ...item,
        name: allUserList[index]?.status,
        value: allUserList[index]?.total.toString(),
      };
    });

    return results;
  };

  const CustomTooltipComponent = ({ customData }: { customData: TooltipItem[] }) => {
    return (
      <div className={introduceRowStyles.tooltipContainer}>
        <div className={introduceRowStyles.tooltip_totalContainer}>
          <span className={introduceRowStyles.tooltip_totalTitle}>Total</span>
          <span className={introduceRowStyles.tooltip_totalTitle}>{totalUsers}</span>
        </div>

        {customData?.map((item) => (
          <div className={introduceRowStyles.tooltip_itemContainer} key={item?.name}>
            <div className={introduceRowStyles.tooltip_itemLeftContent}>
              <span
                className={`${styles.legendCircleShape} ${
                  introduceRowStyles[BulletChartColors[item?.name]]
                }`}
              />
              <span className={introduceRowStyles.tooltip_totalTitle}>{item?.name}:</span>
            </div>
            <span className={introduceRowStyles.tooltip_totalTitle}>{item?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const data = [
    {
      title: '',
      ranges: [totalUsers],
      measures: userTotalValueArray,
      target: 0,
    },
  ];
  const config = {
    data,
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'target',
    xField: 'title',
    color: {
      range: ['#fff'],
      measure: ['#73D13D', '#FFA940'],
    },
    label: {
      measure: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    tooltip: {
      showMarkers: false,
      shared: true,
      customItems: (originalItems: TooltipItem[]) => {
        const filterOriginalItems = originalItems.filter(
          (item) => item?.mappingData?.x?.length > 0 && item?.mappingData?.y?.length > 0,
        );
        const newDataItems = handleFormatData(filterOriginalItems);
        return newDataItems;
      },
      customContent: (_, customData: TooltipItem[]) => {
        return <CustomTooltipComponent customData={customData} />;
      },
    },
    legend: false,
  };
  return (
    <Card className={introduceRowStyles.introduceRow_rightContainer}>
      <h1 className={introduceRowStyles.rightContent_title}>Activity status</h1>
      <span className={introduceRowStyles.rightContent_quantity}>{totalUsers} Users</span>
      <Bullet {...config} />
      <Row style={{ gap: '20px' }}>
        {allUserList?.map((userItem) => (
          <Col key={userItem?.status}>
            <div className={styles.legendContainer}>
              <span
                className={`${styles.legendCircleShape} ${
                  introduceRowStyles[BulletChartColors[userItem?.status]]
                }`}
              />
              <span className={styles.legendCircleShape_title}>{userItem?.status}</span>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default BulletProgress;
