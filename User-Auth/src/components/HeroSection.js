import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';
const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  const images = [
    "images/hero_1.jpg",
    "images/hero_2.jpg",
    "images/hero_3.jpg"
  ];

  return (
    <div className="owl-carousel-wrapper">
      <div className="box-92819">
        <h1 className="text-white " style={{fontFamily:'kalam',fontWeight:'bold',color:'#000',fontSize:'100px'}}>Join The <br/>Movement To <br/>End Child Poverty</h1>
        <p><a href="/mpesa" class="btn btn-primary py-3 px-4 rounded-0">Donate Now</a></p>
     </div>

      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="item">
            <img src={image} alt={`Hero ${index + 1}`} style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
