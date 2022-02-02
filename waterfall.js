import React from 'react';
import { scaleLinear } from 'd3-scale';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
} from 'recharts';


const data = [
  { name: 'Item 1', value: 1000, label: '1K' },
  { name: 'Item 2', value: [750, 1000], label: 250 },
  { name: 'Item 3', value: [600, 750], label: 150 },
  { name: 'Item 4', value: [400, 600], label: 200 },
  { name: 'Item 5', value: [399, 400], label: 1 },
  { name: 'Item 6', value: [0, 399], label: 399 },
];

const horizontalPoints = [0, 60, 110, 160, 210, 260, 310, 360, 410, 480];

function Waterfall() {
  return (
    <BarChart
      width={900}
      height={500}
      data={data}
      margin={{
        top: 20,
      }}
    >
      <CartesianGrid
        strokeDasharray="1 10"
        vertical={false}
        horizontalCoordinatesGenerator={args => {
          let hPoints = [];
          const totalLines = Math.ceil(args.offset.height / 70);
          const hScale = scaleLinear()
            .range([args.offset.top, args.height - args.offset.bottom])
            .domain([0, totalLines]);

          for (let i = 0; i <= totalLines; i++) {
            hPoints = [...hPoints, hScale(i)];
          }

          console.log(hPoints, args);
          return hPoints;
        }}
      />
      <XAxis dataKey="name" height={20} />
      <Legend
        verticalAlign="top"
        height={36}
        content={<p style={{ margin: 0 }}>Chart Title</p>}
      />
      <Tooltip
        cursor={false}
        separator=""
        formatter={(value, name, props) => {
          return [props.payload.label, ''];
        }}
      />
      <Bar fill="#4BC0C0" dataKey="value" maxBarSize={15}>
        <LabelList position="top" dataKey="label" />
      </Bar>
    </BarChart>
  );
}

export default Waterfall;
