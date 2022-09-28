import { Bullet } from '@ant-design/plots';

const BulletProgress = () => {
  const data = [
    {
      title: '',
      ranges: [100, 200, 300, 400, 500],
      measures: [250, 250],
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
      target: '#39a3f4',
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
      position: 'top',
      showMarkers: false,
      shared: true,
      customContent: (_, tooltipData) => {
        // khi có data từ api trả về thì format lại tooltipData theo value vs name của data từ api cho mỗi item trong mảng
        // rồi render ở bên dưới
        return `
        <div style="min-width: 145px; min-height: 102px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px; padding: 12px">
            <div style="display: flex; width: 100% ;justify-content: space-between; align-items: center; min-height: 20px;">
                 <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">Total</span>
                 <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${
                   parseInt(tooltipData[0]?.value) + parseInt(tooltipData[1]?.value)
                 }</span>
            </div>

            <div style="display: flex; width: 100%; justify-content: space-between; align-items: center; gap:16px; min-height:20px">
                 <div style="display: flex; gap: 16px; align-items: center;">  
                     <span style="height: 16px; width: 16px; background-color: #73D13D; border-radius: 50%; display: inline-block;"></span>
                     <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${
                       tooltipData[0]?.name
                     }: </span>
                 </div>  
                 <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${
                   tooltipData[0]?.value
                 }</span>
            </div>
            

            <div style="display: flex; width: 100%; justify-content: space-between; align-items: center; gap:16px; min-height:20px">
                  <div style="display: flex; gap: 16px; align-items: center;">  
                      <span style="height: 16px; width: 16px; background-color: #FFA940; border-radius: 50%; display: inline-block;"></span>
                      <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${
                        tooltipData[0]?.name
                      }: </span>
                  </div>  
                   <span style="font-family: 'Roboto'; font-style: normal; font-weight: 400; font-size: 12px; line-height: 20px; color: rgba(0, 0, 0, 0.85);">${
                     tooltipData[0]?.value
                   }</span>
            </div>
        </div>`;
      },
    },
    legend: false,
  };
  return <Bullet {...config} />;
};

export default BulletProgress;
