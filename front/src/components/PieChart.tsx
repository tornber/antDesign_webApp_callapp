import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import axios from 'axios';

const PieChart : React.FC = () => {

    const [data,setData] = useState<object[]>([{}])
    useEffect(() => {
        axios.get('/chartData').then(res => {
            setData(res.data.data)
        })
    })
  const config : object = {
    appendPadding: 10,
    data,
    angleField: 'percentage',
    colorField: 'city',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      // content: (_ref.percentage : string) => {return `${_ref.percentage}%`},
      content: '{percentage}',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
      {
        type: 'element-selected'
      }
    ],
  };

  return (<Pie {...config} />)

}

  export default PieChart