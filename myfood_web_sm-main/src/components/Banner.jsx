import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

export default function Banner() {
  const slides = [
    {
      title: "Welcome Back to FlavorScape",
      subtitle: "HELLO, NEW FRIEND!",
      description: "Discover our chef's special creations with premium ingredients",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
    },
    {
      title: "Culinary Excellence",
      subtitle: "PREMIUM DINING",
      description: "Experience fine dining with our carefully crafted dishes",
      image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=1200",
    },
    {
      title: "Artisanal Delights",
      subtitle: "FRESH & ORGANIC",
      description: "Savor the taste of fresh, locally sourced ingredients",
      image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200",
    }
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      className="h-[800px] relative"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-full w-full " >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 z-10" />
            
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-0.5 bg-orange-500" />
                    <p className="text-orange-500 font-medium tracking-wider">
                      {slide.subtitle}
                    </p>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
                    {slide.title}
                  </h1>
                  
                  <p className="text-gray-200 text-lg mb-8">
                    {slide.description}
                  </p>
                  
                  <div className="md:flex-row flex flex-col gap-4">
                   <Link to='/allFoods'> <button className="px-8 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
                      RESERVATION
                    </button></Link>
                    <Link to='/allFoods'><button className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                      OPEN MENU
                    </button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}