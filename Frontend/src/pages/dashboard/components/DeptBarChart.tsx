import type { FC } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'

const COLORS = ['#1E3A8A', '#2563EB', '#60A5FA', '#A78BFA', '#34D399']

const DeptBarChart: FC<{ data: { name: string; assets: number }[] }> = ({ data }) => {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 6 }}>
          <XAxis dataKey="name" tick={{ fill: '#64748B' }} />
          <YAxis tick={{ fill: '#64748B' }} />
          <Tooltip />
          <Bar dataKey="assets" radius={[8, 8, 8, 8]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DeptBarChart
