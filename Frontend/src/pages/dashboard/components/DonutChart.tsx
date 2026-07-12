import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import type { FC } from 'react'

const COLORS = ['#10B981', '#1E3A8A', '#F59E0B', '#F97316', '#EF4444']

const DonutChart: FC<{ data: { name: string; value: number }[] }> = ({ data }) => {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} innerRadius={58} outerRadius={86} dataKey="value" paddingAngle={2}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number | string) => `${value}`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DonutChart
