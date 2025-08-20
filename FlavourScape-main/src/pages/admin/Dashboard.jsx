// src/pages/admin/Dashboard.jsx

import { 
  Utensils, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Clock,
  Star,
  Target
} from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider'; // Adjust path as needed
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Static data for charts
  const revenueData = [
    { name: 'Jan', revenue: 32000, orders: 180 },
    { name: 'Feb', revenue: 35000, orders: 200 },
    { name: 'Mar', revenue: 38000, orders: 220 },
    { name: 'Apr', revenue: 41000, orders: 240 },
    { name: 'May', revenue: 39000, orders: 210 },
    { name: 'Jun', revenue: 45231, orders: 280 }
  ];

  const popularItemsData = [
    { name: 'Margherita Pizza', sales: 145 },
    { name: 'Caesar Salad', sales: 128 },
    { name: 'Grilled Salmon', sales: 98 },
    { name: 'Pasta Carbonara', sales: 87 },
    { name: 'Chocolate Cake', sales: 76 }
  ];

  const orderTypeData = [
    { name: 'Dine In', value: 45, color: '#3b82f6' },
    { name: 'Takeout', value: 30, color: '#10b981' },
    { name: 'Delivery', value: 25, color: '#f59e0b' }
  ];

  const hourlyOrdersData = [
    { hour: '9AM', orders: 12 },
    { hour: '10AM', orders: 18 },
    { hour: '11AM', orders: 25 },
    { hour: '12PM', orders: 45 },
    { hour: '1PM', orders: 52 },
    { hour: '2PM', orders: 38 },
    { hour: '6PM', orders: 62 },
    { hour: '7PM', orders: 58 },
    { hour: '8PM', orders: 48 },
    { hour: '9PM', orders: 35 }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName || 'Admin'}!</h1>
        <p className="text-gray-500 dark:text-gray-400">Here's a quick overview of your restaurant.</p>
      </div>

      {/* Primary Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mb-8">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212]">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-muted-foreground text-gray-400" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground text-gray-400">+20.1% from last month</p>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212]">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Orders</h3>
            <ShoppingCart className="h-4 w-4 text-muted-foreground text-gray-400" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground text-gray-400">+180.1% from last month</p>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212]">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Menu Items</h3>
            <Utensils className="h-4 w-4 text-muted-foreground text-gray-400" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground text-gray-400">+12 since last month</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212]">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Customers</h3>
            <Users className="h-4 w-4 text-muted-foreground text-gray-400" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground text-gray-400">+8.3% from last month</p>
          </div>
        </div>
      </div>

      {/* Secondary Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mb-8">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212]">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Avg Order Value</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground text-gray-400" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">$19.25</div>
            <p className="text-xs text-muted-foreground text-gray-400">+5.2% from last month</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212]">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Avg Prep Time</h3>
            <Clock className="h-4 w-4 text-muted-foreground text-gray-400" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">14.5 min</div>
            <p className="text-xs text-muted-foreground text-red-400">+2.1 min from last month</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212]">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Customer Rating</h3>
            <Star className="h-4 w-4 text-muted-foreground text-gray-400" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">4.7/5</div>
            <p className="text-xs text-muted-foreground text-gray-400">Based on 1,234 reviews</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212]">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Table Occupancy</h3>
            <Target className="h-4 w-4 text-muted-foreground text-gray-400" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground text-gray-400">32 of 41 tables occupied</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Revenue Chart */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212] p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Items Chart */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212] p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Menu Items</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularItemsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis type="category" dataKey="name" stroke="#6b7280" width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sales" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Type Distribution */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212] p-6">
          <h3 className="text-lg font-semibold mb-4">Order Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {orderTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {orderTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Orders */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212] p-6">
          <h3 className="text-lg font-semibold mb-4">Orders by Hour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="orders" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <button className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212] p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center space-x-3">
              <Utensils className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Add Menu Item</span>
            </div>
          </button>
          
          <button className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212] p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-5 w-5 text-green-500" />
              <span className="font-medium">View Orders</span>
            </div>
          </button>
          
          <button className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212] p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Manage Staff</span>
            </div>
          </button>
          
          <button className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212] p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <span className="font-medium">View Reports</span>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm dark:bg-[#121212] p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">New order #2351 received</span>
              </div>
              <span className="text-xs text-gray-500">2 minutes ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Menu item "Seafood Risotto" updated</span>
              </div>
              <span className="text-xs text-gray-500">15 minutes ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Table 12 requested assistance</span>
              </div>
              <span className="text-xs text-gray-500">32 minutes ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">5-star review received from John D.</span>
              </div>
              <span className="text-xs text-gray-500">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;