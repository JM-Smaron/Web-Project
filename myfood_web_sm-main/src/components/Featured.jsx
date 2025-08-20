import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FeaturedBlog = () => {
    // This would typically come from an API
    const [blogPosts, setBlogPosts] = useState([
        {
            id: 1,
            title: "Seasonal Ingredients: Spring Edition",
            excerpt: "Discover the freshest ingredients this season and how to incorporate them into your meals.",
            image: "https://pipingpotcurry.com/wp-content/uploads/2021/03/Spring-Produce-Guide-1.jpg",
            date: "April 12, 2025",
            author: "Chef Maria Rodriguez"
        },
        {
            id: 2,
            title: "Farm-to-Table: Our Commitment to Local Producers",
            excerpt: "Learn about our partnerships with local farmers and how we ensure the highest quality ingredients.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShgvdNgwu2p2Ue9ttSLRzDKGZZkPZH-Vsj6A&s",
            date: "April 5, 2025",
            author: "James Thompson"
        },
        {
            id: 3,
            title: "Behind the Scenes: Inside Our Kitchen",
            excerpt: "Take a peek at our culinary process and meet the passionate team behind your favorite dishes.",
            image: "https://media.istockphoto.com/id/1405011860/video/filming-a-cooking-show.jpg?s=640x640&k=20&c=ouFns9kIqVyOnwk8EzMPGrVQx4prodbc-74pvE1fKgw=",
            date: "March 27, 2025",
            author: "Emma Chen"
        }
    ]);

    return (
        <div className="container mx-auto px-4 mt-9">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">From Our Blog</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg dark:text-gray-300">
                    Culinary insights, recipes, and stories from our team
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white dark:bg-transparent rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border">
                        <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">{post.date} • {post.author}</p>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{post.title}</h3>
                            <p className="text-gray-600 mb-4 dark:text-gray-300 ">{post.excerpt}</p>
                            <Link 
                                to={`/blog/${post.id}`} 
                                className="text-orange-500 font-medium inline-flex items-center hover:text-orange-600"
                            >
                                Read more
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-10 p-4">
                <Link 
                    to="/blog" 
                    className="inline-block px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition duration-300"
                >
                    View All Articles
                </Link>
            </div>
        </div>
    );
};

export default FeaturedBlog;