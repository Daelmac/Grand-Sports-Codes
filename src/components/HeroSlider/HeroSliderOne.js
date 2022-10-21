import Swiper from "react-id-swiper";
import { Container } from "react-bootstrap";

const HeroSliderOne = ({ sliderData }) => {
  const params = {
    loop: true,
    speed: 1000,
    spaceBetween: 200,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav"></button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav"></button>
    )
  };
  return (
    <div className="hero-slider-one space-mb--r100">
      <Container >
        <div className="hero-slider-one__wrapper" >
          <Swiper {...params}>
            {sliderData &&
              sliderData.map((single) => {
                return (
                  <div
                    className="hero-slider-one__slide swiper-slide"
                    key={single.id}
                    data-aos="fade-right"
                    data-aos-easing="ease-in-sine"
                    data-aos-anchor-placement="top-bottom"
                  >
                    <div className="slider-image">
                      <img                      
                        src={single.image}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default HeroSliderOne;
