// Each stat card (New Leads, Monthly Sales, Available Cars, Deals Closed) in the dashboard

type Props = {
    title: string;
    value: string;
    trend: string;
    trendColor?: 'green' | 'red' | 'gray';
    icon?: React.ReactNode;
  };
  
  export function MetricCard({ title, value, trend, trendColor = 'gray', icon }: Props) {
    const trendColorClass = {
        green: 'text-green-600',
        red: 'text-red-600',
        gray: 'text-gray-800',
    }
    
    return (
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-around">
        {icon && <div className="text-blue-600 text-3xl">{icon}</div>}
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold text-black">{value}</h2>
        </div>
        <p className={`text-sm mt-1 ${trendColorClass[trendColor]}`}>{trend}</p>
      </div>
    );
  }
  