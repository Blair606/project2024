import { Line } from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface AttendanceChartProps {
  period: string;
}

const AttendanceChart = ({ period }: AttendanceChartProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/attendance?period=${period}`);
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
      }
    };
    fetchData();
  }, [period]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Attendance Trends</h3>
      <Line
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {/* Chart configuration */}
      </Line>
    </div>
  );
};

export default AttendanceChart;