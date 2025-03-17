import { useState } from 'react';
import { ChartBarIcon, ArrowTrendingUpIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import PerformanceChart from '../charts/PerfomanceChart';
import AttendanceChart from '../charts/AttendanceChart';
import GradeDistributionChart from '../charts/GradeDistributionChart';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="form-select rounded-md border-gray-300"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="semester">This Semester</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Average Grade</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <ArrowTrendingUpIcon className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <UserGroupIcon className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Students</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart period={timeRange} />
        <AttendanceChart period={timeRange} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <GradeDistributionChart />
      </div>
    </div>
  );
};

export default Analytics;