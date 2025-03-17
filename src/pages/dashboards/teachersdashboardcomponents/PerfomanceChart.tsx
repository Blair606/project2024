import { Line } from 'recharts';
import { useEffect, useState } from 'react';
import { PerformanceData } from '../../../../types';

interface PerformanceChartProps {
  period: 'week' | 'month' | 'year';
}

const PerformanceChart = ({ period }: PerformanceChartProps) => {
  const [data, setData] = useState<PerformanceData[]>([]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Class Performance</h3>
      <Line
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {/* Chart configuration */}
      </Line>
    </div>
  );
};

export default PerformanceChart;