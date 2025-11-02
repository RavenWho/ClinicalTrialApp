import { CostForecastChart } from './CostForecastChart';
import { CostByCategoryChart } from './CostByCategoryChart';
import { ClipboardList, DollarSign, TrendingUp, Users, UserPlus, Receipt, BarChart3, Download, Clock, CheckCircle } from 'lucide-react';

const kpiData = [
  { 
    title: 'Active Trials', 
    value: '24', 
    change: '+3 this month',
    trend: 'up',
    icon: ClipboardList, 
    color: 'text-blue-600', 
    bg: 'bg-blue-50' 
  },
  { 
    title: 'Monthly Spend', 
    value: '$1.63M', 
    change: '+8.2% vs last month',
    trend: 'up',
    icon: DollarSign, 
    color: 'text-green-600', 
    bg: 'bg-green-50' 
  },
  { 
    title: 'MAE (Latest Forecast)', 
    value: '4.2%', 
    change: 'Mean Absolute Error',
    trend: 'neutral',
    icon: TrendingUp, 
    color: 'text-purple-600', 
    bg: 'bg-purple-50' 
  },
  { 
    title: 'Recruits MTD', 
    value: '127', 
    change: '84% of monthly target',
    trend: 'up',
    icon: Users, 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50' 
  },
];

const recentActivities = [
  {
    action: 'New recruitment',
    trial: 'Trial 001 - Oncology Phase III',
    user: 'Dr. Sarah Johnson',
    time: '10 minutes ago',
    icon: UserPlus,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    action: 'Cost entry added',
    trial: 'Trial 002 - Cardiology Phase II',
    user: 'Michael Chen',
    time: '1 hour ago',
    icon: Receipt,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    action: 'Forecast updated',
    trial: 'Trial 003 - Neurology Phase I',
    user: 'Emily Rodriguez',
    time: '2 hours ago',
    icon: TrendingUp,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    action: 'Report exported',
    trial: 'Q3 2025 Financial Summary',
    user: 'James Wilson',
    time: '3 hours ago',
    icon: Download,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    action: 'Site visit completed',
    trial: 'Trial 001 - Site 42',
    user: 'Dr. Lisa Anderson',
    time: '5 hours ago',
    icon: CheckCircle,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
];

const quickActions = [
  {
    label: 'Add Recruitment',
    icon: UserPlus,
    color: 'text-green-600',
    bg: 'bg-green-50',
    hoverBg: 'hover:bg-green-100',
  },
  {
    label: 'Add Cost',
    icon: Receipt,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    hoverBg: 'hover:bg-blue-100',
  },
  {
    label: 'Run Forecast',
    icon: BarChart3,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    hoverBg: 'hover:bg-purple-100',
  },
  {
    label: 'Export Report',
    icon: Download,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    hoverBg: 'hover:bg-amber-100',
  },
];

export function DashboardView() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor key performance indicators and cost analytics</p>
      </div>

      {/* 12-column grid layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* KPI Tiles - 4 tiles across */}
        {kpiData.map((kpi) => (
          <div key={kpi.title} className="col-span-12 sm:col-span-6 lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 pb-2 flex flex-row items-center justify-between">
                <h3 className="text-sm text-gray-700">{kpi.title}</h3>
                <div className={`p-2 rounded-lg ${kpi.bg}`}>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="text-gray-900 mb-1">{kpi.value}</div>
                <p className="text-xs text-gray-500">{kpi.change}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Cost Forecast Chart - 8 columns */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 pb-4 border-b border-gray-200">
              <h3 className="text-gray-900">Actual vs Forecasted Costs</h3>
            </div>
            <div className="p-6">
              <CostForecastChart />
            </div>
          </div>
        </div>

        {/* Quick Actions - 4 columns */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
            <div className="p-6 pb-4 border-b border-gray-200">
              <h3 className="text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className={`w-full flex items-center justify-start px-4 py-3 bg-white border border-gray-200 rounded-lg transition-colors ${action.hoverBg}`}
                  >
                    <div className={`p-1.5 rounded-md ${action.bg} mr-3`}>
                      <action.icon className={`h-4 w-4 ${action.color}`} />
                    </div>
                    <span className="text-sm text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Costs by Category Chart - 8 columns */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 pb-4 border-b border-gray-200">
              <h3 className="text-gray-900">Cost Breakdown by Category</h3>
            </div>
            <div className="p-6">
              <CostByCategoryChart />
            </div>
          </div>
        </div>

        {/* Recent Activity - 4 columns */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full">
            <div className="p-6 pb-4 border-b border-gray-200">
              <h3 className="text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={`p-2 rounded-lg ${activity.iconBg} h-fit`}>
                      <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600 truncate">{activity.trial}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
