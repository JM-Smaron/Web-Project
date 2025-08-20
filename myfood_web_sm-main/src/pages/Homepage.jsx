import { ToastContainer } from "react-toastify";
import Banner from "../components/Banner";
import ServiceShowcase from "../components/ServiceShowcase";
import Testimonials from "../components/Testimonials";
import TopFoodsSection from "../components/TopFoodsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Ace from "../components/Ace";
import NewsletterSubscription from "../components/Newsletter";
import FeaturedBlog from "../components/Featured";


const Homepage = () => {
    return (
        <div >
            <ToastContainer></ToastContainer>
            <div className="min-h-screen">
            <Banner></Banner>
            </div>

                {/* <div>
                    <Ace></Ace>
                </div> */}

            <div>
                <TopFoodsSection></TopFoodsSection>
            </div>

            <div>
                <ServiceShowcase></ServiceShowcase>
            </div>

            <div>
                <WhyChooseUs></WhyChooseUs>
            </div>

            <div>
                <Testimonials></Testimonials>
            </div>
            
            <div>
                    <NewsletterSubscription></NewsletterSubscription>
            </div>

            <div>
                    <FeaturedBlog></FeaturedBlog>
            </div>
           


        </div>

       
    );
};

export default Homepage;