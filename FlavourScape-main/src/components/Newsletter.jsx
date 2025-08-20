import { useState } from "react";

const NewsletterSubscription = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the API call to subscribe the user
        setSubscribed(true);
        setEmail("");
        // Reset the subscribed state after 5 seconds
        setTimeout(() => setSubscribed(false), 5000);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 dark:text-white">Stay Updated</h2>
                <p className="text-gray-600 mb-8 text-lg dark:text-gray-300">
                    Subscribe to our newsletter for exclusive offers, new menu items, and culinary inspiration.
                </p>
                
                <div className="max-w-md mx-auto">
                    {subscribed ? (
                        <div className="bg-green-100 text-green-800 rounded-lg p-4 mb-6">
                            Thank you for subscribing! You'll receive our next newsletter soon.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                required
                                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300"
                            />
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-3 transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    )}
                    <p className="text-sm text-gray-500 mt-4 dark:text-gray-300">
                        We respect your privacy and will never share your information.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSubscription;