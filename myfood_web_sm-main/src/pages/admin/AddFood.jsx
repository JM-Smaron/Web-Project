import { useContext, useState } from 'react';
import { ChefHat, Upload, Utensils } from 'lucide-react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AddFood = () => {
  const [loading, setLoading] = useState(false);
  
    const {user} = useContext(AuthContext);


  const foodCategories = [
    "Main Course",
    "Appetizer",
    "Dessert",
    "Beverage",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const foodData = {
      FoodName: form.foodName.value,
      Image: form.foodImage.value,
      foodCategory: form.foodCategory.value,
      Quantity: parseInt(form.quantity.value),
      Price: parseFloat(form.price.value),
      addedByName: user.displayName,
      addedByEmail: user.email,
      foodOrigin: form.foodOrigin.value,
      Description: form.description.value,
      Ingredients: form.ingredients.value,
      makingProcedure: form.makingProcedure.value
    };

    try {
            axios.post('https://assignment-11-flame.vercel.app/allFoods',foodData)
            .then(res => {
                toast.success("Food Added Successfully")
                
                form.reset();
            })
            
    } catch (error) {
     toast.error("Error adding food")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-transparent pb-12">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-12">
        <ToastContainer></ToastContainer>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Add New Food Item</h1>
            <p className="text-white/80">Share your culinary masterpiece with the world</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#121212] rounded-xl shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Food Name
              </label>
              <input
                type="text"
                name="foodName"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white dark:bg-transparent"
                placeholder="Enter food name"
              />
            </div>

            {/* Food Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white  mb-2">
                Food Image URL
              </label>
              <input
                type="url"
                name="foodImage"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white dark:bg-transparent"
                placeholder="Enter image URL"
              />
            </div>

            {/* Food Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white  mb-2">
                Food Category
              </label>
              <select
                  name="foodCategory"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-transparent dark:bg-transparent text-black dark:text-white appearance-none"
                >
                  <option value="" className="dark:text-white dark:bg-transparent">Select category</option>
                  {foodCategories.map((category) => (
                    <option key={category} value={category} className="bg-transparent dark:bg-black dark:text-white">
                      {category}
                    </option>
                  ))}
                </select>

            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Quantity Available
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white dark:bg-transparent"
                placeholder="Enter quantity"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white ">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                min="0.01"
                step="0.01"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white dark:bg-transparent"
                placeholder="Enter price"
              />
            </div>

            {/* Food Origin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Food Origin (Country)
              </label>
              <input
                type="text"
                name="foodOrigin"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white dark:bg-transparent"
                placeholder="Enter country of origin"
              />
            </div>

            {/* Added By (Read-only) */}
            <div className="md:col-span-2 ">
              <label className="block text-sm font-medium text-gray-700 dark:text-white dark:bg-transparent mb-2">
                Added By
              </label>
              <div className="md:flex-row flex flex-col gap-4">
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg dark:text-white dark:bg-transparent"
                />
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg dark:text-white dark:bg-transparent"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white ">
                Ingredients
              </label>
              <textarea
                name="ingredients"
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white dark:bg-transparent"
                placeholder="List the ingredients (comma separated)"
              />
            </div>

            {/* Making Procedure */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white ">
                Making Procedure
              </label>
              <textarea
                name="makingProcedure"
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white dark:bg-transparent"
                placeholder="Describe the cooking procedure"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white ">
                Short Description
              </label>
              <textarea
                name="description"
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:text-white dark:bg-transparent"
                placeholder="Enter a short description of the food item"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding Food...
                </>
              ) : (
                <>
                  <ChefHat className="w-5 h-5" />
                  Add Food Item
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
