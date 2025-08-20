import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaUtensils, FaShoppingCart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const TopFoodsSection = () => {
  const [foods, setFoods] = useState([]);
  const {user} = useContext(AuthContext);
  const currentUserEmail = user?.email;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios.get('https://assignment-11-flame.vercel.app/allFoods')
      .then(res => {
        let foods = res.data;
  
        
        if (currentUserEmail) {
          foods = foods.filter(food => food.addedByEmail !== currentUserEmail);
        }
  
        // Sort by SoldCount and get top 6
        const topFoods = foods.sort((a, b) => b.SoldCount - a.SoldCount).slice(0, 6);
        setFoods(topFoods);
        setLoading(false)
      })
      .catch(err => err);
  }, [currentUserEmail]); 
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Most Popular Dishes
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-12 h-1 bg-orange-500 rounded-full" />
          <FaUtensils className="text-orange-500 text-xl" />
          <div className="w-12 h-1 bg-orange-500 rounded-full" />
        </div>
      </div>
      

      {/* Cards Grid */}
     {
      loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) :  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {foods.map((food) => (
        <div key={food._id} className="group bg-white dark:bg-transparent dark:border  rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={food.Image}
              alt={food.FoodName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ${food.Price}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                {food.FoodName}
              </h3>
              <div className="flex items-center gap-1 text-orange-500">
                <FaStar />
                <span className="font-medium">{food.SoldCount} sold</span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 h-14">
              {food.Description}
            </p>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                By <span className="text-orange-500 font-medium">{food.Chef}</span>
              </div>
              <Link to={`/allFoods/${food._id}`}>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <FaShoppingCart />
                <span>Details</span>
              </button></Link>
            </div>
          </div>
        </div>
      ))}
    </div>
     }
      <div className='mt-10 mb-5 justify-center flex'>
        <Link to='/allFoods'><button className='bg-orange-500 btn w-[200px] text-xl text-white'>See All</button></Link>
      </div>
    </div>
  );
};

export default TopFoodsSection;
