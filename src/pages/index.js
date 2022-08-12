import { connect } from "react-redux";
import { getProducts } from "../lib/product";
import { LayoutTwo } from "../components/Layout";
import { HeroSliderOne } from "../components/HeroSlider";
import { ProductTab } from "../components/ProductTab";
import { ImageCta } from "../components/Cta";
import heroSliderData from "../data/hero-sliders/hero-slider-one.json";
import imageCtaData from "../data/image-cta/image-cta-one.json";

const Home = () => {
  return (
    <LayoutTwo aboutOverlay={false}>
      {/* hero slider */}
      <HeroSliderOne sliderData={heroSliderData} />

      {/* product tab */}
      <ProductTab />

      {/* image cta */}
      <ImageCta
        image={imageCtaData.image}
        tags={imageCtaData.tags}
        title={imageCtaData.title}
        url={imageCtaData.url}
      />
    </LayoutTwo>
  );
};


export default Home;
