import { Suspense, useState } from 'react';
import { Card, Col, DatePicker, Radio, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import moment from 'moment';
import IntroduceRow from './components/IntroduceRow/IntroduceRow';

import PageLoading from './components/PageLoading';

import styles from './style.less';
import { PageContainer } from '@ant-design/pro-components';
import PieChart from './components/PieChart';
import type { DatePickerProps } from 'antd';
import BarChart from './components/BarChart';

type MachinesType = 'all' | 'stm' | 'atm' | 'cmd';

const Analysis = () => {
  const [machineType, setMachineType] = useState<MachinesType>('all');

  const handleChangeRadioButton = (e: RadioChangeEvent) => {
    setMachineType(e.target.value);
  };

  // title cho card cua pie chart
  const PieChartCardTitle = () => {
    return (
      <div className={styles.myAdminCard_titleContainer}>
        <span className={styles.myAdminCard_titleContainer_description}>Machine type:</span>
        <Radio.Group value={machineType} onChange={handleChangeRadioButton}>
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
      month: 'Jan',
      value: 3,
      type: 'Lon',
    },
    {
      month: 'Feb',
      value: 4,
      type: 'Lon',
    },
    {
      month: 'Mar',
      value: 3.5,
      type: 'Lon',
    },
    {
      month: 'Apr',
      value: 5,
      type: 'Lon',
    },
    {
      month: 'May',
      value: 4.9,
      type: 'Lon',
    },
    {
      month: 'Jun ',
      value: 6,
      type: 'Lon',
    },
    {
      month: 'Jul',
      value: 7,
      type: 'Lon',
    },
    {
      month: 'Aug',
      value: 9,
      type: 'Lon',
    },
    {
      month: 'Sep',
      value: 13,
      type: 'Lon',
    },
    {
      month: 'Oct',
      value: 13,
      type: 'Lon',
    },
    {
      month: 'Nov',
      value: 13,
      type: 'Lon',
    },
    {
      month: 'Dec',
      value: 13,
      type: 'Lon',
    },
    {
      month: 'Jan',
      value: 3,
      type: 'Bor',
    },
    {
      month: 'Feb',
      value: 4,
      type: 'Bor',
    },
    {
      month: 'Mar',
      value: 3.5,
      type: 'Bor',
    },
    {
      month: 'Apr',
      value: 5,
      type: 'Bor',
    },
    {
      month: 'May',
      value: 4.9,
      type: 'Bor',
    },
    {
      month: 'Jun ',
      value: 6,
      type: 'Bor',
    },
    {
      month: 'Jul',
      value: 7,
      type: 'Bor',
    },
    {
      month: 'Aug',
      value: 9,
      type: 'Bor',
    },
    {
      month: 'Sep',
      value: 13,
      type: 'Bor',
    },
    {
      month: 'Oct',
      value: 13,
      type: 'Bor',
    },
    {
      month: 'Nov',
      value: 13,
      type: 'Bor',
    },
    {
      month: 'Dec',
      value: 13,
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
                      <PieChart data={secondPieChartData} color={['#FFA940', '#1890FF']} />
                    </Col>
                    <Col span={10}>
                      <div className={styles.pieChart_legendContainer}>
                        <div className={styles.pieChart_legendItem}>
                          <span
                            className={`${styles.pieChart_legendShape}`}
                            style={{ background: '#FFA940' }}
                          />
                          <span className={styles.pieChart_legendTitle}>Unsolved</span>
                        </div>
                        <div className={styles.pieChart_legendItem}>
                          <span
                            className={`${styles.pieChart_legendShape}`}
                            style={{ background: '#1890FF' }}
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
                    <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                      <Col>
                        <h1 className={styles.barChart_yAxisTitle}>Transactions</h1>
                      </Col>
                      <Col>
                        <Row style={{ gap: '20px' }}>
                          <Col>
                            <div className={styles.legendContainer}>
                              <span
                                className={`${styles.legendCircleShape} ${styles.legendCircleShape_active}`}
                              />
                              <span className={styles.legendCircleShape_title}>Active</span>
                            </div>
                          </Col>
                          <Col>
                            <div className={styles.legendContainer}>
                              <span
                                className={`${styles.legendCircleShape} ${styles.legendCircleShape_inActive}`}
                              />
                              <span className={styles.legendCircleShape_title}>Inactive</span>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <BarChart data={barChartData} />
                    </Row>
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
