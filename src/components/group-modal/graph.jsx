import React, { useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useState } from 'react';



export default function Graph(props) {

const colors = ['#0088FE', '#0088FE', '#0088FE', '#FF8042'];
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
    <BarChart
      width={300}
      height={200}
      data={data}
      margin={{
        top: 20,
        right: 10,
        left: 0,
        bottom: 5,
      }}
    >
      <XAxis 
      width={10}
      height={30}  dataKey="name" />
      <YAxis />
      <Bar dataKey="count" fill="#8884d8" label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 4]} />
        ))}
      </Bar>
    </BarChart>
  );
}

