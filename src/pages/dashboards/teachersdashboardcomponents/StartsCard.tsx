interface StatsCardProps {
    title: string;
    value: string;
    trend: string;
  }
  
  const StatsCard = ({ title, value, trend }: StatsCardProps) => {
    const isPositive = trend.startsWith('+');
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <div className="flex items-baseline mt-4">
          <p className="text-2xl font-semibold">{value}</p>
          <span className={`ml-2 text-sm ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend}
          </span>
        </div>
      </div>
    );
  };
  
  export default StatsCard;