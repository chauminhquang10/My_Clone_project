import { Pie, measureTextWidth } from '@ant-design/plots';

type PieChartDataItem = {
  type: string;
  value: string | number;
};

type PieChartProps = {
  data: PieChartDataItem[];
  colors: Record<string, string>;
  unit: string;
};

const PieChart = ({ data, colors, unit }: PieChartProps) => {
  function renderStatistic(containerWidth, text) {
    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};">${text}</div>`;
  }

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    color: ({ type }: { type: string }) => {
      if (colors) {
        return colors[type];
      } else return 'red';
    },

    radius: 1,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container, view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : 'Total';
          return renderStatistic(d, text);
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, customData) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}` : `${customData.reduce((r, d) => r + d.value, 0)}`;

          const style = {
            fontSize: 32,
          };

          const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
          const R = width / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

          let scale = 1;

          if (width < textWidth) {
            scale = Math.min(
              Math.sqrt(
                Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))),
              ),
              1,
            );
          }

          const formatText = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <span style="font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}
                </span>
                <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 14px; line-height: 22px; color: #595959;">
                  ${unit}
                </span>
            </div>`;

          return renderStatistic(width, formatText);
        },
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
    legend: false,
  };
  return <Pie {...config} />;
};

export default PieChart;
