import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    month: 'Jan',
    personnel: 420000,
    medication: 380000,
    logistics: 180000,
    overhead: 120000,
  },
  {
    month: 'Feb',
    personnel: 445000,
    medication: 420000,
    logistics: 195000,
    overhead: 125000,
  },
  {
    month: 'Mar',
    personnel: 460000,
    medication: 450000,
    logistics: 210000,
    overhead: 130000,
  },
  {
    month: 'Apr',
    personnel: 480000,
    medication: 470000,
    logistics: 220000,
    overhead: 135000,
  },
  {
    month: 'May',
    personnel: 495000,
    medication: 490000,
    logistics: 235000,
    overhead: 140000,
  },
  {
    month: 'Jun',
    personnel: 510000,
    medication: 515000,
    logistics: 245000,
    overhead: 145000,
  },
  {
    month: 'Jul',
    personnel: 525000,
    medication: 540000,
    logistics: 255000,
    overhead: 150000,
  },
  {
    month: 'Aug',
    personnel: 540000,
    medication: 560000,
    logistics: 265000,
    overhead: 155000,
  },
  {
    month: 'Sep',
    personnel: 555000,
    medication: 585000,
    logistics: 275000,
    overhead: 160000,
  },
  {
    month: 'Oct',
    personnel: 570000,
    medication: 610000,
    logistics: 285000,
    overhead: 165000,
  },
];

export function CostByCategoryChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-900 mb-2">{label} 2025</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: ${(entry.value / 1000).toFixed(0)}K
            </p>
          ))}
          <p className="text-xs text-gray-900 mt-1 pt-1 border-t border-gray-200">
            Total: ${(total / 1000).toFixed(0)}K
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm text-gray-900">Costs by Category</h3>
        <p className="text-xs text-gray-500 mt-1">Monthly breakdown across cost categories</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            tickFormatter={(value) => `$${(value / 1000)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Bar dataKey="personnel" stackId="a" fill="#3b82f6" name="Personnel" />
          <Bar dataKey="medication" stackId="a" fill="#10b981" name="Medication" />
          <Bar dataKey="logistics" stackId="a" fill="#f59e0b" name="Logistics" />
          <Bar dataKey="overhead" stackId="a" fill="#8b5cf6" name="Overhead" />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-4 gap-3 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="text-xs text-gray-600">Personnel (34%)</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="text-xs text-gray-600">Medication (38%)</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="text-xs text-gray-600">Logistics (17%)</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <div className="text-xs text-gray-600">Overhead (11%)</div>
        </div>
      </div>
    </div>
  );
}
