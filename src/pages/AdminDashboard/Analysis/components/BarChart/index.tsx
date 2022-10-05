import { Column } from '@ant-design/plots';

import { each, groupBy } from '@antv/util';
import { MAPPING_BAR_TOOLTIP_MONTHS } from '../../../../../constants/index';

type BarChartDataItem = {
  month: string | number;
  type: string;
  value: string | number;
};

type BarChartProps = {
  data: BarChartDataItem[];
  colors: Record<string, string>;
  year: string;
};

const BarChart = ({ data, colors }: BarChartProps) => {
  const config = {
    data,
    colorField: 'type',
    color: ({ type }: { type: string }) => {
      if (colors) {
        return colors[type];
      } else return 'red';
    },
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
    tooltip: {
      formatter: (datum: Record<string, any>) => {
        let eachTotal = 0;
        each(groupBy(data, 'month'), (values) => {
          if (values[0].month === datum.month) {
            eachTotal = values.reduce((a, b) => {
              return a + b.value;
            }, 0);
          }
        });

        return {
          title: `${MAPPING_BAR_TOOLTIP_MONTHS[datum.month]}/2022 ${'\xa0'.repeat(
            40,
          )} ${eachTotal}`,
          name: `${datum.type}`,
          value: datum.value,
        };
      },
    },
    legend: false,
  };

  return <Column {...config} style={{ width: '100%' }} />;
};

export default BarChart;
