import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

const SingleFoodPage = () => {
    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo(0, 0);
      }, []);
      
    const food = useLoaderData();
    console.log(food);
    

    return (
      <div className=" min-h-screen py-8">
        <div className="max-w-7xl mx-auto bg-white dark:bg-transparent dark:border rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex flex-col">
            <div className="md:flex-shrink-0 w-full">
              <img
                className="md:w-full md:h-[400px] object-cover "
                src={food.Image}
                alt={food.FoodName}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold">
                {food.Chef}
              </div>
              <h1 className="mt-2 text-3xl leading-8 font-bold text-gray-900 dark:text-white">
                {food.FoodName}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{food.Description}</p>
              <div className="mt-4">
                <span className="text-orange-500 font-bold text-xl">
                  ${food.Price.toFixed(2)}
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  Quantity: {food.Quantity}
                </span>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ingredients</h2>
                <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300">
                {Array.isArray(food.Ingredients) ? (
                            food.Ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))
                          ) : (
                            <li>{food.Ingredients}</li>
                          )}

                </ul>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Other Info:</span> {food.OtherInfo}
                </p>
              </div>
              <div className="mt-4">
                <span className="inline-block  text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Sold: {food.SoldCount}
                </span>
              </div>
              <div className="py-5 w-full">
               <Link to={`/purchase/${food._id}`}> <button className="btn w-full bg-orange-500 text-white">Purchase</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SingleFoodPage;