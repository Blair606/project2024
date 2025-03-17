import { Bar } from 'recharts';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GradeDistributionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/grades/distribution');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch grade distribution:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
      <Bar
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {/* Chart configuration */}
      </Bar>
    </div>
  );
};

export default GradeDistributionChart;