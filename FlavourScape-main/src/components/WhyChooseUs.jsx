import { FaUtensils, FaLeaf } from 'react-icons/fa';
import { LuChefHat } from "react-icons/lu";
const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUtensils className="w-12 h-12" />,
      title: "Menu for every taste",
      description: "Delicious dishes crafted for everyone!"
    },
    {
      icon: <FaLeaf className="w-12 h-12" />,
      title: "Always fresh ingredients",
      description: "Freshness in every flavorful bite!"
    },
    {
      icon: <LuChefHat className='w-12 h-12'></LuChefHat>,
      title: "Experienced chefs",
      description: "Crafted by skilled culinary experts!"
    }
  ];

  return (
    <div className="py-20 px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="text-orange-500 font-medium tracking-wide mb-4">
          FEATURES
        </p>
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6">
          Why people choose us?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Quality, taste, affordability, and exceptional customer-focused service!
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="text-center group">
            {/* Icon Container */}
            <div className="mb-6 inline-block">
              <div className="w-24 h-24 mx-auto border-2 border-gray-200 rounded-full flex items-center justify-center text-orange-500 group-hover:border-orange-500 group-hover:text-orange-600 transition-colors duration-300">
                {feature.icon}
              </div>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-serif text-gray-900 dark:text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
