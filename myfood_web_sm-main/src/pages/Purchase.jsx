import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Purchase = () => {

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const { user } = useContext(AuthContext);
  const food = useLoaderData();
  const [currentDate, setCurrentDate] = useState('');
  const [notavailstatus, setNotAvailStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity1, setQuantity] = useState(food?.Quantity);

  useEffect(() => {
    if (food.Quantity === 0) {
      setNotAvailStatus(true);
    }
  }, [food.Quantity]);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toISOString().split('T')[0]);
  }, []);

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    const BuyerName =user.displayName;
    const BuyerEmail =user.email;
    const foodname = food.FoodName;
    const foodID = food._id;
    const foodPrice = food.Price;
    const date = currentDate;
    const image = food.Image;

    const quantityForm = parseInt(e.target.quantity.value);
    const soldCount = parseInt(food.SoldCount);
    const quantits = parseInt(food.Quantity);
    const order = {quantityForm, BuyerName,BuyerEmail,foodname,foodID,date,foodPrice,image};
    const newSoldCount = parseInt( soldCount + quantityForm);
    const quan = parseInt(quantits - quantityForm);
    const updatedInfo = {quan,newSoldCount}

    

     if(quantityForm <= food.Quantity &&  quantityForm !== 0){
        axios.post('https://assignment-11-flame.vercel.app/orders',order)
        .then(res=>{
            
            setLoading(false)
            toast.success("Order Successful")
            setQuantity(quan)
            // window.location.reload();
        })

        axios.patch(`https://assignment-11-flame.vercel.app/allFoods/${foodID}`, updatedInfo)
        .then(res=> res)
    }
    else{
        toast.error("Please select valid quantity!")
        setLoading(false)
    }
    
  };


  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-transparent dark:border rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Purchase Food Item</h1>
            <p className="text-orange-100 mt-1">Complete your order details below</p>
          </div>

          {/* Food Image and Basic Info */}
          <div className="flex items-center gap-6 p-8 bg-orange-50 dark:bg-transparent">
            <img 
              src={food.Image} 
              alt={food.FoodName}
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{food.FoodName}</h2>
              <p className="text-lg font-medium text-orange-600 mt-1">${food.Price}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Available:</span>
                {notavailstatus ? (
                  <span className="text-red-600 font-medium text-sm bg-red-50 px-2 py-1 rounded">
                    Out of Stock
                  </span>
                ) : (
                  <span className="text-green-600 font-medium text-sm bg-green-50 dark:bg-orange-50 px-2 py-1 rounded">
                    {quantity1} items left
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Purchase Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                min="1"
                max={food.Quantity}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors dark:bg-transparent dark:text-white"
              />
            </div>

            {/* Buyer Information */}
            <div className="bg-gray-50 dark:bg-transparent rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-white">Buyer Name</label>
                  <p className="font-medium text-gray-900 dark:text-white">{user.displayName}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-white">Buyer Email</label>
                  <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 dark:text-white">Purchase Date</label>
                <p className="font-medium text-gray-900 dark:text-white">{currentDate}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-white">Subtotal</span>
                <span className="text-lg font-medium dark:text-white">${food.Price}</span>
              </div>
              
              {/* Purchase Button */}
              <div className="flex justify-end">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <button
                    type="submit"
                    disabled={notavailstatus}
                    className={`
                      px-8 py-3 rounded-lg text-sm font-medium transition-all
                      ${notavailstatus 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg'
                      }
                    `}
                  >
                    {notavailstatus ? 'Out of Stock' : 'Confirm Purchase'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default Purchase;
