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
        console.log('first', originalItems);
        return originalItems;
      },
      // customContent: () => {
      //   return `
      //   <div style="min-width: 145px; min-height: 102px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px; padding: 12px">
      //       <div style="display: flex; width: 100% ;justify-content: space-between; align-items: center; min-height: 20px;">
      //            <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">Total</span>
      //            <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${totalUsers}</span>
      //       </div>

      //       <div style="display: flex; width: 100%; justify-content: space-between; align-items: center; gap: 16px; min-height: 20px">
      //            <div style="display: flex; gap: 16px; align-items: center;">
      //                <span style="height: 16px; width: 16px; background-color: #73D13D; border-radius: 50%; display: inline-block;"></span>
      //                <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${allUserList[0]?.status}: </span>
      //            </div>
      //            <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${allUserList[0]?.total}</span>
      //       </div>

      //       <div style="display: flex; width: 100%; justify-content: space-between; align-items: center; gap: 16px; min-height: 20px">
      //             <div style="display: flex; gap: 16px; align-items: center;">
      //                 <span style="height: 16px; width: 16px; background-color: #FFA940; border-radius: 50%; display: inline-block;"></span>
      //                 <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${allUserList[1]?.status}: </span>
      //             </div>
      //              <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${allUserList[1]?.total}</span>
      //       </div>
      //   </div>`;
      // },
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

// export declare type TooltipItem = {
//   /**
//    * @title 原始数据
//    */
//   readonly data: Datum;
//   /**
//    * @title 映射之后的数据
//    */
//   readonly mappingData: Datum;
//   /**
//    * @title tooltip item 中名称
//    */
//   readonly name: string;
//   /**
//    * @title tooltip item 中值
//    */
//   readonly value: string | number;
//   /**
//    * @title tooltip item 中颜色
//    */
//   readonly color: string;
//   /**
//    * @title tooltip item 中图标类型
//    */
//   readonly marker: string;
// };
