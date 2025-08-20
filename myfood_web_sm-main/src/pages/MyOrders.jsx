import  { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { AuthContext } from '../providers/AuthProvider';
import swal from 'sweetalert';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const {user} = useContext(AuthContext);
  const [loading,setLoading] = useState(false)
  // Sample data - in real app this would come from API
  useEffect(() => {
    axios.get(`https://assignment-11-flame.vercel.app/orders/${user.email}` ,{withCredentials: true})
    .then(res => setOrders(res.data))
  }, []);

  const handleDeleteOrder = (orderId) => {
    setLoading(true)
    // Filter out the deleted order
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to remove this item?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        axios.delete(`https://assignment-11-flame.vercel.app/orders/${orderId}`)
        .then(res => {
          swal("Deleted!", "Order has been deleted!", "success")
          setOrders(orders.filter(order => order._id !== orderId));
          setLoading(false)
        })
        
      }
    });

    
    
  };

  if(loading){
    <span className="loading loading-spinner text-error"></span>
  }
 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white dark:bg-transparent dark:border rounded-lg shadow-lg overflow-hidden">
            <img 
              src={order.image} 
              alt={order.foodname}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{order.foodname}</h2>
                 <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-white">
                  <span className="font-semibold">Price:</span> ${order.foodPrice}
                </p>
                <p className="text-gray-600 dark:text-white">
                  <span className="font-semibold">Quantity:</span> {order.quantityForm}
                </p>
                <p className="text-gray-600 dark:text-white">
                  <span className="font-semibold">Order Date:</span> {moment(order.date).format('MMMM Do YYYY, h:mm a')}
                </p>
                <p className="text-gray-600 dark:text-white">
                  <span className="font-semibold">Buyer:</span> {order.BuyerName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;