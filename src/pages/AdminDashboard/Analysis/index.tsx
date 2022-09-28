import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { Card, Col, DatePicker, Radio, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import moment from 'moment';
import IntroduceRow from './components/IntroduceRow/IntroduceRow';

import PageLoading from './components/PageLoading';

import type { AnalysisData } from './data.d';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-components';
import PieChart from './components/PieChart';
import type { DatePickerProps } from 'antd';
import BarChart from './components/BarChart';

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};

type SalesType = 'all' | 'online' | 'stores';

const Analysis: FC<AnalysisProps> = () => {
  const [salesType, setSalesType] = useState<SalesType>('all');

  const handleChangeRadioButton = (e: RadioChangeEvent) => {
    setSalesType(e.target.value);
  };

  // title cho card cua pie chart
  const PieChartCardTitle = () => {
    return (
      <div className={styles.myAdminCard_titleContainer}>
        <span>Machine type:</span>
        <Radio.Group value={salesType} onChange={handleChangeRadioButton}>
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="stm">STM</Radio.Button>
          <Radio.Button value="atm">ATM</Radio.Button>
          <Radio.Button value="cmd">CDM</Radio.Button>
        </Radio.Group>
      </div>
    );
  };

  const firstPieChartData = [
    {
      type: 'In service',
      value: 27,
    },
    {
      type: 'Out of service',
      value: 25,
    },
    {
      type: 'Offline',
      value: 18,
    },
    {
      type: 'Unknown',
      value: 15,
    },
  ];

  const secondPieChartData = [
    {
      type: 'Unsolved',
      value: 27,
    },
    {
      type: 'Solved',
      value: 25,
    },
  ];

  const yearFormat = 'YYYY';
  const onChangeYear: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const barChartData = [
    {
      year: '1991',
      value: 3,
      type: 'Lon',
    },
    {
      year: '1992',
      value: 4,
      type: 'Lon',
    },
    {
      year: '1993',
      value: 3.5,
      type: 'Lon',
    },
    {
      year: '1994',
      value: 5,
      type: 'Lon',
    },
    {
      year: '1995',
      value: 4.9,
      type: 'Lon',
    },
    {
      year: '1996',
      value: 6,
      type: 'Lon',
    },
    {
      year: '1997',
      value: 7,
      type: 'Lon',
    },
    {
      year: '1998',
      value: 9,
      type: 'Lon',
    },
    {
      year: '1999',
      value: 13,
      type: 'Lon',
    },
    {
      year: '1991',
      value: 3,
      type: 'Bor',
    },
    {
      year: '1992',
      value: 4,
      type: 'Bor',
    },
    {
      year: '1993',
      value: 3.5,
      type: 'Bor',
    },
  ];

  return (
    <GridContent>
      <PageContainer className={styles['table-container']} header={undefined} footer={undefined}>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow />
        </Suspense>

        <Card className={styles.myAdminCard}>
          <Row>
            <PieChartCardTitle />
          </Row>

          <Row gutter={24} className={styles.pieChart_container}>
            <Col span={12}>
              <Suspense fallback={null}>
                <Card title={<span className={styles.pieChart_cardTitle}>Machine status</span>}>
                  <Row align="middle">
                    <Col span={14}>
                      <PieChart data={firstPieChartData} />
                    </Col>
                    <Col span={10}>
                      <div className={styles.pieChart_legendContainer}>
                        <div className={styles.pieChart_legendItem}>
                          <span
                            className={`${styles.pieChart_legendShape}`}
                            style={{ background: '#6394F9' }}
                          />
                          <span className={styles.pieChart_legendTitle}>In service</span>
                        </div>
                        <div className={styles.pieChart_legendItem}>
                          <span
                            className={`${styles.pieChart_legendShape}`}
                            style={{ background: '#62DAAA' }}
                          />
                          <span>Out of service</span>
                        </div>
                        <div className={styles.pieChart_legendItem}>
                          <span
                            className={`${styles.pieChart_legendShape}`}
                            style={{ background: '#657797' }}
                          />
                          <span>Offline</span>
                        </div>
                        <div className={styles.pieChart_legendItem}>
                          <span
                            className={`${styles.pieChart_legendShape}`}
                            style={{ background: '#F6C021' }}
                          />
                          <span>Unknown</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Suspense>
            </Col>
            <Col span={12}>
              <Suspense fallback={null}>
                <Card title={<span className={styles.pieChart_cardTitle}>Warning</span>}>
                  <Row align="middle">
                    <Col span={14}>
                      <PieChart data={secondPieChartData} />
                    </Col>
                    <Col span={10}>
                      <div className={styles.pieChart_legendContainer}>
                        <div className={styles.pieChart_legendItem}>
                          <span
                            className={`${styles.pieChart_legendShape}`}
                            style={{ background: '#6394F9' }}
                          />
                          <span className={styles.pieChart_legendTitle}>Unsolved</span>
                        </div>
                        <div className={styles.pieChart_legendItem}>
                          <span
                            className={`${styles.pieChart_legendShape}`}
                            style={{ background: '#62DAAA' }}
                          />
                          <span>Solved</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Suspense>
            </Col>
          </Row>

          <Row className={styles.barChart_container}>
            <Col span={24}>
              <Suspense fallback={null}>
                <Card
                  title={<span className={styles.barChart_cardTitle}>Transaction statistics</span>}
                  extra={
                    <DatePicker
                      onChange={onChangeYear}
                      picker="year"
                      defaultValue={moment('2022', yearFormat)}
                      format={yearFormat}
                    />
                  }
                >
                  <Col span={24}>
                    <BarChart data={barChartData} />
                  </Col>
                </Card>
              </Suspense>
            </Col>
          </Row>
        </Card>
      </PageContainer>
    </GridContent>
  );
};

export default Analysis;
