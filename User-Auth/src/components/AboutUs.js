import React from 'react';

const features = [
    {
        icon: "images/truck.svg",
        title: "Fast & Free to Donate",
        description: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
    },
    {
        icon: "images/bag.svg",
        title: "Easy to Donate",
        description: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
    },
    {
        icon: "images/support.svg",
        title: "24/7 Support",
        description: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
    },
    {
        icon: "images/return.svg",
        title: "Hassle Free Returns",
        description: "Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
    }
];

const AboutUs = () => {
    const headerStyle = {
        color: '#333', // Darker font color
    };

    return (
        <div style={{ padding: '7rem 0' }}>
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-6">
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', ...headerStyle }}>Why Choose Us</h2>
                        <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>

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
    );
};

export default AboutUs;
