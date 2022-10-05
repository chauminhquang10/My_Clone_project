import { Suspense, useState } from 'react';
import { Card, Col, DatePicker, Radio, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import moment from 'moment';
import IntroduceRow from './components/IntroduceRow/IntroduceRow';
import PageLoading from './components/PageLoading';
import type { RangePickerProps } from 'antd/es/date-picker';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-components';
import PieChart from './components/PieChart';
import type { DatePickerProps } from 'antd';
import BarChart from './components/BarChart';
import { useRequest } from 'umi';
import { getMachineActivityStatistic } from '@/services/STM-APIs/DashboardController';

import { MAPPING_MONTHS } from '../../../constants/index';

type MachinesType = '' | 'STM' | 'ATM' | 'CDM';

type ChartObjData = Record<string, Record<string, any>>;

type PieChartDataItem = {
  type: string;
  value: number;
};

type OriginalBarChartDataItem = {
  month: number;
  success: number;
  failed: number;
};

type FormattedBarChartDataItem = {
  month: string;
  value: number;
  type: string;
};

const firstPieChartColor = {
  IN_SERVICE: '#6394F9',
  OUT_OF_SERVICE: '#62DAAA',
  UNKNOWN: '#F6C021',
  OFFLINE: '#657797',
};

const secondPieChartColor = {
  Solved: '#1890FF',
  Unsolved: '#FFA940',
};

const mappingBarChartDataType = {
  success: 'Success',
  failed: 'Failed',
};

const barChartColor = {
  Success: '#62DAAB',
  Failed: '#FFA940',
};

const Analysis = () => {
  // xử lí chọn loại máy
  const [machineType, setMachineType] = useState<MachinesType>('');

  // xử lí data cho pie chart đầu tiên
  const [statusStatisticsData, setStatusStatisticsData] = useState<PieChartDataItem[]>([]);

  // xử lí data cho pie chart đầu tiên
  const [warningStatisticsData, setWarningStatisticsData] = useState<PieChartDataItem[]>([]);

  // xử lí chọn năm
  const [filterYear, setFilterYear] = useState<string>('2022');

  const [barChartData, setBarChartData] = useState<FormattedBarChartDataItem[]>([]);

  // xử lí các loại data của bar chart ( để làm legend shape )
  const [barChartDataTypes, setBarChartDataTypes] = useState<string[]>([]);

  const handleChangeRadioButton = (e: RadioChangeEvent) => {
    setMachineType(e.target.value);
  };

  // title cho card cua pie chart
  const PieChartCardTitle = () => {
    return (
      <div className={styles.myAdminCard_titleContainer}>
        <span className={styles.myAdminCard_titleContainer_description}>Machine type:</span>
        <Radio.Group value={machineType} onChange={handleChangeRadioButton}>
          <Radio.Button value="">All</Radio.Button>
          <Radio.Button value="STM">STM</Radio.Button>
          <Radio.Button value="ATM">ATM</Radio.Button>
          <Radio.Button value="CDM">CDM</Radio.Button>
        </Radio.Group>
      </div>
    );
  };

  const handleFormatChartData = <Type,>(itemObj: Type): any[] => {
    const resultArr: any[] = [];
    Object.keys(itemObj).forEach(function (key) {
      resultArr.push(itemObj[key]);
    });
    return resultArr;
  };

  const handleMappingBarChartData = (originalBarChartData: OriginalBarChartDataItem[]) => {
    const formattedBarChartData = originalBarChartData?.reduce(
      (prev: any, barDataItem: OriginalBarChartDataItem) => {
        const firstTypeFindIndex = Object.keys(mappingBarChartDataType).findIndex(
          (element) => element === Object.keys(barDataItem)[1],
        );

        const secondTypeFindIndex = Object.keys(mappingBarChartDataType).findIndex(
          (element) => element === Object.keys(barDataItem)[2],
        );

        return [
          ...prev,
          {
            month: MAPPING_MONTHS[barDataItem?.month],
            value: barDataItem?.success,
            type:
              firstTypeFindIndex > -1
                ? mappingBarChartDataType[Object.keys(mappingBarChartDataType)[firstTypeFindIndex]]
                : 'default',
          },
          {
            month: MAPPING_MONTHS[barDataItem?.month],
            value: barDataItem?.failed,
            type:
              secondTypeFindIndex > -1
                ? mappingBarChartDataType[Object.keys(mappingBarChartDataType)[secondTypeFindIndex]]
                : 'default',
          },
        ];
      },
      [],
    );
    setBarChartData(formattedBarChartData);
  };

  useRequest<any>(
    () => {
      if (machineType)
        return getMachineActivityStatistic({ machineType, transactionYear: filterYear });
      return getMachineActivityStatistic({ transactionYear: filterYear });
    },
    {
      onSuccess(data) {
        // xử lí data cho pie chart 1
        const allStatusDataArray = handleFormatChartData<ChartObjData>(data?.statusStatistics);
        // rename data field to fix the pie chart data field
        const mappingDataFirstPieChart = allStatusDataArray?.map((item) => ({
          type: item?.status,
          value: item?.total,
        }));
        setStatusStatisticsData(mappingDataFirstPieChart);

        // xử lí data cho pie chart 2
        const allWarningDataArray = handleFormatChartData<ChartObjData>(data?.warningStatistics);
        // rename data field to fix the pie chart data field
        const mappingDataSecondPieChart = allWarningDataArray?.map((item) => ({
          type: item?.solved ? 'Solved' : 'Unsolved',
          value: item?.total,
        }));
        setWarningStatisticsData(mappingDataSecondPieChart);

        // xử lí data cho bar chart
        const allBarChartDataArray = handleFormatChartData<ChartObjData>(
          data?.transactionStatistics,
        );
        handleMappingBarChartData(allBarChartDataArray);
        // lấy loại dữ liệu của bar chart
        const getChartDataTypesArr = Object.keys(allBarChartDataArray[0]);
        getChartDataTypesArr.splice(0, 1);

        const formattedResult = getChartDataTypesArr.map((item) => {
          const findIndex = Object.keys(mappingBarChartDataType).findIndex(
            (element) => element === item,
          );
          if (findIndex > -1) {
            return mappingBarChartDataType[Object.keys(mappingBarChartDataType)[findIndex]];
          }
          return 'default';
        });
        setBarChartDataTypes(formattedResult);
      },
      refreshDeps: [machineType, filterYear],
    },
  );

  const yearFormat = 'YYYY';

  const onChangeYear: DatePickerProps['onChange'] = (_, dateString) => {
    setFilterYear(dateString);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current.year() > 2022 || current.year() < 2020; // disabling everything further than 2022 and in the past before 2020
  };

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
                      <PieChart
                        data={statusStatisticsData}
                        colors={firstPieChartColor}
                        unit="Machines"
                      />
                    </Col>
                    <Col span={10}>
                      <div className={styles.pieChart_legendContainer}>
                        {statusStatisticsData?.map((item) => (
                          <div className={styles.pieChart_legendItem} key={item?.type}>
                            <span
                              className={`${styles.pieChart_legendShape}`}
                              style={{ background: `${firstPieChartColor[item?.type]}` }}
                            />
                            <span className={styles.pieChart_legendTitle}>{item?.type}</span>
                          </div>
                        ))}
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
                      <PieChart
                        data={warningStatisticsData}
                        colors={secondPieChartColor}
                        unit="Warnings"
                      />
                    </Col>
                    <Col span={10}>
                      <div className={styles.pieChart_legendContainer}>
                        {warningStatisticsData?.map((item) => (
                          <div className={styles.pieChart_legendItem} key={item?.type}>
                            <span
                              className={`${styles.pieChart_legendShape}`}
                              style={{ background: `${secondPieChartColor[item?.type]}` }}
                            />
                            <span className={styles.pieChart_legendTitle}>{item?.type}</span>
                          </div>
                        ))}
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
                      defaultValue={moment(filterYear, yearFormat)}
                      format={yearFormat}
                      disabledDate={disabledDate}
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
                          {barChartDataTypes?.map((item) => (
                            <Col key={item}>
                              <div className={styles.legendContainer}>
                                <span
                                  className={`${styles.legendCircleShape}`}
                                  style={{ background: `${barChartColor[item]}` }}
                                />
                                <span className={styles.legendCircleShape_title}>{item}</span>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <BarChart data={barChartData} colors={barChartColor} year={filterYear} />
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
