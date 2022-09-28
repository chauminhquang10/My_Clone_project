import { Column } from '@ant-design/plots';

import { each, groupBy } from '@antv/util';

type BarChartDataItem = {
  year: string | number;
  type: string;
  value: string | number;
};

type BarChartProps = {
  data: BarChartDataItem[];
};

const BarChart = ({ data }: BarChartProps) => {
  const annotations = [];
  each(groupBy(data, 'year'), (values, k) => {
    const value = values.reduce((a, b) => a + b.value, 0);
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
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    maxColumnWidth: 92,
    intervalPadding: 28,
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    annotations,
  };

  return <Column {...config} />;
};

export default BarChart;
