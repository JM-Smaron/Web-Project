import { Helmet } from "react-helmet";


const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
           <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="max-w-3xl mx-auto text-center">
       
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </h1>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <div className="flex justify-center gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have gone on a fitness journey of its own. Let's get you back on track!
        </p>

        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-blue-600"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Return Home
          </button>
        </div>

        
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-50" />
          <div className="absolute top-1/4 -left-8 w-32 h-32 bg-blue-200 rounded-full opacity-50" />
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;