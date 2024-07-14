import React from 'react';

const features = [
    {
        icon: "images/truck.svg",
        title: "Fast & Free to Donate",
        description: "Donating is swift and free on our platform. We prioritize efficiency, ensuring your contributions reach impoverished schools promptly. It's a seamless process that empowers you to make a difference without delay."
    },
    {
        icon: "images/bag.svg",
        title: "Easy to Donate",
        description: "Donating couldn't be simpler. Our platform offers an intuitive interface that makes contributing to impoverished schools effortless. With just a few clicks, you can support education initiatives and make a meaningful impact."
    },
    {
        icon: "images/support.svg",
        title: "24/7 Support",
        description: "We're here for you round the clock. Our dedicated support team ensures that your donation experience is smooth and problem-free. Whether you have questions or need assistance, we're committed to providing timely help."
    },
    {
        icon: "images/return.svg",
        title: "Hassle Free Returns",
        description: "Ensuring your satisfaction is our priority. Our platform guarantees a hassle-free experience, ensuring that every donation you make is handled with care and transparency. If you ever need assistance, our team is ready to assist you promptly."
    }
];

const AboutUs = () => {
    const headerStyle = {
        color: '#333', // Darker font color
    };

    return (
        <>
        <div style={{ padding: '7rem 0' }}>
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-6">
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', ...headerStyle }}>Why Choose Us</h2>
                        <p>We offer a comprehensive and detailed info about how your donations are used.</p>

                        <div className="row my-5">
                            {features.map((feature, index) => (
                                <div key={index} className="col-6 col-md-6" style={{ marginBottom: '2rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <img src={feature.icon} alt={feature.title} style={{ maxWidth: '100%', height: 'auto' }} />
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', ...headerStyle }}>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                content: '""',
                                width: '255px',
                                height: '217px',
                                backgroundImage: 'url(images/dots-yellow.svg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                transform: 'translate(-40%, -40%)',
                                zIndex: '-1'
                            }} />
                            <img src="images/sc1.jpg" alt="Why Choose Us" style={{ borderRadius: '20px', width: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AboutUs;
