import { useContext, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { AuthContext } from '../providers/AuthProvider';


const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    title: "Grilled Salmon",
    chef: "Chef Maria Rodriguez",
    description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    title: "Pasta Primavera",
    chef: "Chef Marco Rossi",
    description: "Handmade pasta with seasonal vegetables and light cream sauce"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75",
    title: "Chocolate Soufflé",
    chef: "Chef Sophie Laurent",
    description: "Decadent chocolate soufflé with vanilla bean ice cream"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    title: "Artisanal Pizza",
    chef: "Chef Giovanni Bruno",
    description: "Wood-fired pizza with fresh mozzarella and basil"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    title: "Garden Salad",
    chef: "Chef Emma Thompson",
    description: "Organic greens with house-made vinaigrette"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    title: "Sushi Platter",
    chef: "Chef Hiroshi Tanaka",
    description: "Fresh assorted sushi with premium grade fish"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
    title: "French Toast",
    chef: "Chef Pierre Dubois",
    description: "Brioche French toast with maple syrup and berries"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468",
    title: "Beef Wellington",
    chef: "Chef Gordon Smith",
    description: "Classic Beef Wellington with mushroom duxelles"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
    title: "Seafood Paella",
    chef: "Chef Carlos Ruiz",
    description: "Traditional Spanish paella with fresh seafood"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    title: "Vegetable Curry",
    chef: "Chef Priya Sharma",
    description: "Aromatic curry with seasonal vegetables"
  }
];

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {user} = useContext(AuthContext);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen ">
     
      <div className="relative h-[40vh] bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-80"></div>
        <img 
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0" 
          alt="Gallery Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Culinary Masterpieces
            </h1>
            <p className="text-lg text-gray-200">
              A visual feast of our finest creations
            </p>
          </div>
        </div>
      </div>

     
      <div className="max-w-8xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
              onClick={() => openLightbox(index)}
            >
              
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              
           
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-lg text-gray-200 mb-3 font-bold">{user?.displayName}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={galleryItems.map(item => ({ src: item.image }))}
        index={currentImageIndex}
      />
    </div>
  );
};

export default Gallery;
