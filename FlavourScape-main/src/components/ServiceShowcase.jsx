// ServiceShowcase.jsx
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceShowcase = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Grid */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="relative h-[300px] overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
              alt="Elegant restaurant interior"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-xl mt-8">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
              alt="Gourmet food plating"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-gray-900 leading-tight dark:text-white">
            EXCEPTIONAL DINING & CULINARY EXCELLENCE
          </h2>

          <p className="text-gray-600 text-lg dark:text-gray-300">
            Experience the perfect blend of ambiance and gastronomy in our award-winning restaurant. Every dish tells a story of passion, creativity, and the finest ingredients.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-gray-700 dark:text-gray-400">Handcrafted dishes using locally-sourced, seasonal ingredients</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-gray-700 dark:text-gray-400">Expert sommeliers and curated wine selection</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-gray-700 dark:text-gray-400">Intimate atmosphere with exceptional service</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvX2TmQdu9sOhoXQZlWLFpTtScSynbyURuzg&s"
              alt="Head Chef"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Marcus Laurent</h4>
              <p className="text-gray-600 dark:text-gray-300">Executive Chef</p>
            </div>
            
          </div>

          <Link 
            to='/allFoods'
            className="inline-block px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            EXPLORE OUR MENU
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceShowcase;
