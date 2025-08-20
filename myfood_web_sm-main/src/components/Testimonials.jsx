import { useState } from 'react';
import { FaQuoteRight, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Critic",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      quote: "The culinary experience here is simply outstanding. Every dish tells a story of passion and creativity.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Food Blogger",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      quote: "Incredible attention to detail in every dish. The flavors are perfectly balanced and the presentation is amazing.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      quote: "I've never had such consistently excellent meals anywhere else. The service is impeccable too!",
      rating: 5
    }
  ];

  return (
    <div className="py-20 ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-orange-500 font-medium tracking-wide mb-4">
            TESTIMONIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6">
            What Our Customers Say
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          <div className="flex justify-center mb-12">
            {/* Large Quote Icon */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <FaQuoteRight className="text-6xl text-orange-500/20" />
            </div>

            {/* Testimonial Content */}
            <div className="max-w-3xl text-center">
              <p className="text-xl text-gray-600 dark:text-gray-300 italic mb-8">
                {testimonials[activeTestimonial].quote}
              </p>

              <div className="flex justify-center mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
                />
                <div className="text-left">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? 'bg-orange-500 w-6'
                    : 'bg-orange-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
