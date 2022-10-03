import { Column } from '@ant-design/plots';

import { each, groupBy } from '@antv/util';

type BarChartDataItem = {
  month: string | number;
  type: string;
  value: string | number;
};

type BarChartProps = {
  data: BarChartDataItem[];
};

const BarChart = ({ data }: BarChartProps) => {
  const annotations = [];
  each(groupBy(data, 'month'), (values, k) => {
    const value = values.reduce((a: any, b: any) => a + b.value, 0);

    annotations.push({
      type: 'text',
      position: [k, value],
      content: `${value}`,
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'rgba(0,0,0,0.85)',
      },
      offsetY: -10,
    });
  });
  const config = {
    data,
    color: ['#62DAAB', '#FFA940'],
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: '#E2E7E9',
            lineWidth: 1,
            lineDash: [4, 5],
            strokeOpacity: 1,
          },
        },
      },
    },
    isStack: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    maxColumnWidth: 92,
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
        opacity: 1,
      },
    },
    tooltip: {
      formatter: (datum: Record<string, any>) => ({
        title: `${datum.month}/2022`,
        name: `${datum.type}`,
        value: datum.value,
      }),
    },
    annotations,
    legend: false,
  };

  return <Column {...config} style={{ width: '100%' }} />;
};

export default BarChart;
