import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
    {
        text: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.",
        author: "Maria Jones",
        position: "CEO, Co-Founder, XYZ Inc.",
        image: "images/person-1.png"
    },
    {
        text: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.",
        author: "Maria Jones",
        position: "CEO, Co-Founder, XYZ Inc.",
        image: "images/person_2.jpg"
    },
    {
        text: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.",
        author: "Maria Jones",
        position: "CEO, Co-Founder, XYZ Inc.",
        image: "images/person_3.jpg"
    }
];

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />
    };

    return (
        <div style={{ padding: '3rem 0 7rem 0' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mx-auto text-center">
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Testimonials</h2>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div style={{ position: 'relative', textAlign: 'center' }}>
                            <Slider {...settings}>
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} style={{ padding: '30px 0' }}>
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8 mx-auto">
                                                <div style={{ textAlign: 'center' }}>
                                                    <blockquote style={{ fontSize: '16px', lineHeight: '32px', marginBottom: '5rem' }}>
                                                        <p>{testimonial.text}</p>
                                                    </blockquote>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                                                            <img src={testimonial.image} alt={testimonial.author} style={{ maxWidth: '80px', borderRadius: '50%' }} />
                                                        </div>
                                                        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#000', marginBottom: '0' }}>{testimonial.author}</h3>
                                                        <span style={{ display: 'block', marginBottom: '3rem' }}>{testimonial.position}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            style={{
                position: 'absolute',
                top: '50%',
                width: '58px',
                height: '58px',
                lineHeight: '58px',
                borderRadius: '50%',
                background: 'rgba(0, 123, 255, 0.1)',
                color: '#000',
                transition: '0.3s all ease',
                cursor: 'pointer',
                left: '-10px',
                zIndex: 1,
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3b5d50';
                e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 123, 255, 0.1)';
                e.currentTarget.style.color = '#000';
            }}
        >
            &#9664;
        </div>
    );
};

const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            style={{
                position: 'absolute',
                top: '50%',
                width: '58px',
                height: '58px',
                lineHeight: '58px',
                borderRadius: '50%',
                background: 'rgba(0, 123, 255, 0.1)',
                color: '#000',
                transition: '0.3s all ease',
                cursor: 'pointer',
                right: '0',
                zIndex: 1,
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3b5d50';
                e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 123, 255, 0.1)';
                e.currentTarget.style.color = '#000';
            }}
        >
            &#9654;
        </div>
    );
};

export default Testimonial;
