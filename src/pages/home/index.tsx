
import HeroCarousel from "./hero-carousel";
import CategoriesSection from "./categories-section";
import TodayDealsSection from "./deals-section";
import ProductSections from "./product-sections";
import TopRatedProducts from "./top-rated-products";

const HomePage = () => {
  return (
    <div className="w-full">
      <HeroCarousel />
      
      <TodayDealsSection />
      <ProductSections />
      <CategoriesSection />
      <TopRatedProducts />
    </div>
  )
}

export default HomePage
