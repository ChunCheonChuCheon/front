import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useState } from 'react';
import { useEffect } from 'react';


const BarChart = (props) => {
    const [data, setData] = useState(null);

    const transformData = (inputData) => {
        const transformedData = inputData.top3Category.map((item) => {
          return {
            name: item.category,
            count: item.score,
          };
        });
      
        // 추가 데이터
        transformedData.push({
          name: '미참여',
          count: inputData.noResponseNumber,
        });
        return transformedData;
      };
      
    
    
    useEffect(() => {
        setData(transformData(props.data));
    
      }, [props.data]);
    
      if (data === null) {
        return null;
      }
    

  return (
    <div style={{ height: '200px' }}>
    <ResponsiveBar
      data={data}
      keys={['count']}
      indexBy="name"
      margin={{ top: 10, right: 10, bottom: 50, left: 10 }}
      padding={0.2}
      colors={({ index }) => (index <= 2 ? 'skyblue' : 'pink')}  // 1번째부터 3번째 막대는 빨강, 4번째는 파랑
      
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,

      }}
      
      labelSkipWidth={12}
      labelSkipHeight={12}
    />
  </div>
  );
};

export default BarChart;
