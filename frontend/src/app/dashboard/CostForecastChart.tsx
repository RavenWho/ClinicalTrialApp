import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


// Mock data for the chart with confidence bands
const generateData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => {
    const actual = index < 10 ? 1500000 + Math.random() * 500000 + index * 100000 : null;
    const forecasted = 1500000 + index * 120000;
    const upperBound = forecasted * 1.15;
    const lowerBound = forecasted * 0.85;
    
    return {
      month,
      actual,
      forecasted,
      upperBound,
      lowerBound,
    };
  });
};

export function CostForecastChart() {
  const [dateRange, setDateRange] = useState('ytd');
  const data = generateData();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-900 mb-1">{payload[0].payload.month} 2025</p>
          {payload.map((entry: any, index: number) => (
            entry.dataKey !== 'upperBound' && entry.dataKey !== 'lowerBound' && (
              <p key={index} className="text-xs" style={{ color: entry.color }}>
                {entry.name}: ${(entry.value / 1000000).toFixed(2)}M
              </p>
            )
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-900">Cost Analysis</h3>
          <p className="text-xs text-gray-500 mt-1">Actual vs forecasted costs with confidence interval</p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-32">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ytd">YTD 2025</SelectItem>
            <SelectItem value="q4">Q4 2024</SelectItem>
            <SelectItem value="q3">Q3 2024</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconType="line"
          />
          <Area
            type="monotone"
            dataKey="upperBound"
            stackId="1"
            stroke="none"
            fill="url(#confidenceBand)"
            fillOpacity={1}
            name="Confidence Band"
          />
          <Area
            type="monotone"
            dataKey="lowerBound"
            stackId="1"
            stroke="none"
            fill="white"
            fillOpacity={1}
          />
          <Line 
            type="monotone" 
            dataKey="forecasted" 
            stroke="#3b82f6" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Forecasted"
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#10b981" 
            strokeWidth={2.5}
            dot={{ fill: '#10b981', r: 4 }}
            name="Actual"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
