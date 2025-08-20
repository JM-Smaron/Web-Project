import { useState, useEffect, useContext } from 'react';
import { Search, ChefHat, ArrowUpDown } from 'lucide-react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', or 'desc'

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { count } = useLoaderData();

  const totalPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(totalPages).keys()];

  const handleItemChange = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePageNumberChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSort = () => {
    // Cycle through: null -> asc -> desc -> null
    setSortOrder(current => {
      if (current === null) return 'asc';
      if (current === 'asc') return 'desc';
      return null;
    });
  };

  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.email;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://assignment-11-flame.vercel.app/allFoods?page=${currentPage}&size=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        if (!user) {
          setFoods(data);
        } else {
          const filteredFoods = data.filter(food => food.addedByEmail !== currentUserEmail);
          setFoods(filteredFoods);
        }
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, user, currentUserEmail]);

  const filteredAndSortedFoods = foods
    .filter(food => food.FoodName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === null) return 0;
      const priceA = parseFloat(a.Price);
      const priceB = parseFloat(b.Price);
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

  return (
    <div className="min-h-screen">
      {/* Page Title Section */}
      <div className="relative h-[300px] bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60">
          <div className="h-full flex flex-col items-center justify-center">
            <ChefHat className="w-16 h-16 text-orange-500 mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Our Menu
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">Home</span>
              <span className="text-white">/</span>
              <span className="text-white">All Foods</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Sort Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 max-w-xl mx-auto mb-12">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for your favorite food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 pl-14"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <button
            onClick={handleSort}
            className={`flex items-center gap-2 px-6 py-4 rounded-full ${
              sortOrder
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700'
            } hover:bg-orange-600 hover:text-white transition-colors`}
          >
            <ArrowUpDown className="w-4 h-4" />
            {sortOrder === 'asc' ? 'Price: Low to High' : sortOrder === 'desc' ? 'Price: High to Low' : 'Sort by Price'}
          </button>
        </div>

        {/* Food Cards Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedFoods.map((food) => (
              <div key={food._id} className="bg-white dark:bg-transparent dark:border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img
                    src={food.Image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                    alt={food.FoodName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    ${food.Price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {food.FoodName}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">By {food.Chef || food.addedByName}</p>
                    </div>
                    <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                      {food.SoldCount || 'n/a'} sold
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 h-20">
                    {food.Description}
                  </p>

                  <div className="flex items-center justify-between dark:text-gray-300">
                    <div>
                      Quantity: {food.Quantity}
                    </div>

                    <Link to={`/allFoods/${food._id}`}>
                      <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && filteredAndSortedFoods.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No foods found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col items-center my-6">
          <p className="mb-4 dark:text-white">Current Page: {currentPage + 1}</p>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-lg ${currentPage === 0 ? 'bg-gray-300' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            >
              Prev
            </button>

            {pages.map(page => (
              <button
                key={page}
                onClick={() => handlePageNumberChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page ? 'bg-orange-600 text-white' : 'bg-gray-200 hover:bg-orange-500'
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === pages.length - 1}
              className={`px-4 py-2 rounded-lg ${currentPage === pages.length - 1 ? 'bg-gray-300' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            >
              Next
            </button>
          </div>

          <select
            value={itemsPerPage}
            onChange={handleItemChange}
            className="mt-4 px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllFoods;