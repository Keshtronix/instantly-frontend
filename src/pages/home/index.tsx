
import HeroCarousel from "./hero-carousel";
import CategoriesSection from "./categories-section";
import TodayDealsSection from "./deals-section";
import ProductSections from "./product-sections";

const HomePage = () => {
  return (
    <div className="w-full">
      <HeroCarousel />
      
      <TodayDealsSection />
      <ProductSections />
      <CategoriesSection />
    </div>
  )
}

export default HomePage
