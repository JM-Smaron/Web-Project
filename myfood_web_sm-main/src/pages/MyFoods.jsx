// MyFoodsPage.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
// import useAxios from '../../hooks/useAxios';

const MyFoods= () => {
  const [myFoods, setMyFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  // const axiosSecure = useAxios();
    const {user} = useContext((AuthContext));

  useEffect(() => {
    

    axios.get(`https://assignment-11-flame.vercel.app/allFoods/byEmail/${user?.email}`, {withCredentials: true})
    .then(res => setMyFoods(res.data))
 
  }, []);
  

  const handleUpdate = (e, foodId) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedFood = {
      FoodName: formData.get('foodName'),
      Price: parseFloat(formData.get('price')),
      Quantity: parseInt(formData.get('quantity')),
      Description: formData.get('description'),
      Image: formData.get('foodImage'),
      foodCategory: formData.get('foodCategory')
    };

    axios.patch(`https://assignment-11-flame.vercel.app/allFoods/update/${foodId}`,updatedFood ,{
      withCredentials: true,
  })
    .then(res=> {
      setLoading(false)
      toast.success("Updated Successfully")
      setIsModalOpen(false);
      setSelectedFood(null);
      window.location.reload();
    })
    
    
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <ToastContainer></ToastContainer>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Food Items</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your food listings</p>
        </div>

        {/* Food Cards Grid */}
        {
          myFoods.length === 0 ? <div>No foods added </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myFoods.map((food) => (
            <div key={food._id} className="bg-white dark:bg-transparent dark:border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src={food.Image} 
                alt={food.FoodName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{food.FoodName}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    ${food.Price}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 text-sm dark:text-gray-300">Category: {food.foodCategory}</p>
                  <p className="text-gray-600 text-sm dark:text-gray-300">Quantity: {food.Quantity}</p>
                  <p className="text-gray-600 text-sm line-clamp-2 dark:text-gray-300 h-32">{food.Description}</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedFood(food);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Update Food
                </button>
              </div>
            </div>
          ))}
        </div>
        }

        {/* Update Modal */}
        {isModalOpen && selectedFood && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Update Food Item</h2>
                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedFood(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={(e) => handleUpdate(e, selectedFood._id)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
                    <input
                      type="text"
                      name="foodName"
                      defaultValue={selectedFood.foodName}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        name="price"
                        defaultValue={selectedFood.price}
                        step="0.01"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        defaultValue={selectedFood.quantity}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      name="foodCategory"
                      defaultValue={selectedFood.foodCategory}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="url"
                      name="foodImage"
                      defaultValue={selectedFood.foodImage}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      defaultValue={selectedFood.description}
                      rows="3"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedFood(null);
                      }}
                      className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                   {
                    loading? <span className="loading loading-spinner text-error"></span> :  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Update Food
                  </button>
                   }
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoods;
