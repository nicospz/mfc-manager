import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type MonthData = { month: number; price: number };

type ChartProps = {
  data: MonthData[];
  currentMonth: number;
  onMonthClick: (monthData: MonthData) => void;
};

const Chart: React.FC<ChartProps> = ({ data, currentMonth, onMonthClick }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="price" onClick={onMonthClick}>
          {data.map((entry) => (
            <Cell
              cursor="pointer"
              fill={entry.month === currentMonth ? "#82ca9d" : "#8884d8"}
              key={`cell-${entry.month}`}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
