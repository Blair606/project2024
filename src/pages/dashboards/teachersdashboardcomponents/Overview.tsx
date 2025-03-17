import { useState } from 'react';
import PerformanceChart from '../charts/PerformanceChart';
import GradeDistributionChart from '../charts/GradeDistributionChart';
import { ClassStats } from '../../../../types';

const Overview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Students" value="156" trend="+12%" />
        <StatsCard title="Average Grade" value="85%" trend="+3%" />
        <StatsCard title="Active Courses" value="4" trend="0%" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart period={selectedPeriod} />
        <GradeDistributionChart />
      </div>
    </div>
  );
};

export default Overview;