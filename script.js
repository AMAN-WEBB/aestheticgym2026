const { useState, useEffect } = React;

// Lucide Icons Component
const Icon = ({ name, className = "w-6 h-6" }) => {
    useEffect(() => {
        lucide.createIcons();
    }, []);
    return React.createElement('i', { 'data-lucide': name, className });
};

const AestheticGym = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [formStatus, setFormStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [selectedCert, setSelectedCert] = useState(null);

    // Add your certificate images here
    const certificates = [
        {
            id: 1,
            title: 'Certified Personal Trainer',
            organization: 'NASM',
            year: '2024',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800'
        },
        {
            id: 2,
            title: 'Sports Nutrition Specialist',
            organization: 'ISSA',
            year: '2023',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800'
        },
        {
            id: 3,
            title: 'Strength & Conditioning Coach',
            organization: 'NSCA',
            year: '2023',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800'
        },
        {
            id: 4,
            title: 'Functional Training Expert',
            organization: 'ACE',
            year: '2022',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800'
        }
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const services = [
        { icon: 'users', title: 'Personal Training', desc: 'One-on-one coaching tailored to your fitness goals with expert trainers' },
        { icon: 'dumbbell', title: 'Weight Training', desc: 'Build muscle and strength with structured progressive overload programs' },
        { icon: 'heart', title: 'Cardio Training', desc: 'Improve endurance and cardiovascular health with dynamic workouts' },
        { icon: 'zap', title: 'Strength & Conditioning', desc: 'Functional training to enhance athletic performance and mobility' },
        { icon: 'trending-up', title: 'Body Transformation', desc: 'Complete programs designed for dramatic physique changes' },
        { icon: 'apple', title: 'Diet & Nutrition', desc: 'Personalized meal plans and nutritional guidance for optimal results' }
    ];

    const galleryImages = [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920',
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1920',
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920',
        'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=1920'
    ];

    useEffect(() => {
        if (isAutoPlaying) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [isAutoPlaying]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMobileMenuOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormStatus(null);

        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            setFormStatus({ type: 'error', message: 'All fields are required' });
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormStatus({ type: 'error', message: 'Invalid email format' });
            setLoading(false);
            return;
        }

        try {
            // Replace YOUR_FORM_ID with your actual Formspree form ID
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormStatus({ type: 'success', message: 'Message sent successfully! We\'ll contact you soon.' });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            setFormStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return React.createElement('div', { className: "min-h-screen bg-black text-gray-100" },
        // Certificate Modal
        selectedCert && React.createElement('div', {
            className: "fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4",
            onClick: () => setSelectedCert(null)
        },
            React.createElement('div', {
                className: "max-w-4xl w-full bg-gray-900 rounded-lg overflow-hidden",
                onClick: (e) => e.stopPropagation()
            },
                React.createElement('div', { className: "relative" },
                    React.createElement('button', {
                        onClick: () => setSelectedCert(null),
                        className: "absolute top-4 right-4 text-gray-400 hover:text-white bg-black/50 rounded-full p-2 z-10"
                    }, React.createElement(Icon, { name: 'x', className: 'w-6 h-6' })),
                    React.createElement('img', {
                        src: selectedCert.image,
                        alt: selectedCert.title,
                        className: "w-full h-auto"
                    }),
                    React.createElement('div', { className: "p-6 bg-gray-800" },
                        React.createElement('h3', { className: "text-2xl font-bold text-gray-100 mb-2" }, selectedCert.title),
                        React.createElement('p', { className: "text-gray-400" }, selectedCert.organization + ' • ' + selectedCert.year)
                    )
                )
            )
        ),

        // Navigation
        React.createElement('nav', { 
            className: `fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm shadow-2xl' : 'bg-transparent'}`
        },
            React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
                React.createElement('div', { className: "flex justify-between items-center h-20" },
                    React.createElement('div', { 
                        className: "flex items-center space-x-3 cursor-pointer",
                        onClick: () => scrollToSection('home')
                    },
                        React.createElement('img', { 
                            src: "https://i.imgur.com/8QZ5yXg.png",
                            alt: "Aesthetic Gym",
                            className: "w-12 h-12 transition-transform hover:scale-110"
                        }),
                        React.createElement('span', { className: "text-2xl font-bold text-gray-100 tracking-tight" }, 'AESTHETIC GYM')
                    ),
                    React.createElement('div', { className: "hidden md:flex space-x-8" },
                        ['home', 'services', 'gallery', 'certificates', 'contact'].map(section =>
                            React.createElement('button', {
                                key: section,
                                onClick: () => scrollToSection(section),
                                className: "text-sm font-semibold tracking-wide uppercase text-gray-400 hover:text-gray-100 transition-colors"
                            }, section)
                        )
                    ),
                    React.createElement('button', {
                        className: "md:hidden text-gray-300",
                        onClick: () => setMobileMenuOpen(!mobileMenuOpen)
                    }, React.createElement(Icon, { name: mobileMenuOpen ? 'x' : 'menu' }))
                )
            ),
            // Mobile Menu
            mobileMenuOpen && React.createElement('div', { className: "md:hidden bg-black/98 backdrop-blur-sm border-t border-gray-800" },
                React.createElement('div', { className: "px-4 pt-2 pb-4 space-y-3" },
                    ['home', 'services', 'gallery', 'certificates', 'contact'].map(section =>
                        React.createElement('button', {
                            key: section,
                            onClick: () => scrollToSection(section),
                            className: "block w-full text-left px-4 py-3 text-sm font-semibold tracking-wide uppercase text-gray-300 hover:text-gray-100 hover:bg-gray-800/50 rounded transition-all"
                        }, section)
                    )
                )
            )
        ),
        
        // Hero Section
        React.createElement('section', {
            id: 'home',
            className: "relative min-h-screen flex items-center justify-center overflow-hidden"
        },
            React.createElement('div', { className: "absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" }),
            React.createElement('div', {
                className: "absolute inset-0 opacity-20",
                style: {
                    backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }
            }),
            React.createElement('div', { className: "relative z-10 text-center px-4 max-w-5xl mx-auto" },
                React.createElement('img', {
                    src: "https://i.imgur.com/8QZ5yXg.png",
                    alt: "Aesthetic Gym",
                    className: "w-32 h-32 mx-auto mb-8"
                }),
                React.createElement('h1', { className: "text-5xl sm:text-6xl md:text-8xl font-bold text-gray-100 mb-6 tracking-tight leading-tight" },
                    'BUILD YOUR BEST',
                    React.createElement('br'),
                    React.createElement('span', { className: "text-gray-400" }, 'AESTHETIC')
                ),
                React.createElement('p', { className: "text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed" },
                    'Transform your body, elevate your mind, and unlock your true potential in our premium training facility'
                ),
                React.createElement('div', { className: "flex flex-col sm:flex-row gap-4 justify-center" },
                    React.createElement('button', {
                        onClick: () => scrollToSection('contact'),
                        className: "px-10 py-4 bg-gray-100 text-black font-bold text-lg tracking-wide hover:bg-gray-300 transition-all transform hover:scale-105 shadow-lg"
                    }, 'JOIN NOW'),
                    React.createElement('button', {
                        onClick: () => scrollToSection('services'),
                        className: "px-10 py-4 bg-transparent border-2 border-gray-400 text-gray-300 font-bold text-lg tracking-wide hover:bg-gray-800 hover:border-gray-300 transition-all transform hover:scale-105"
                    }, 'VIEW SERVICES')
                )
            )
        ),

        // Services Section
        React.createElement('section', {
            id: 'services',
            className: "py-24 px-4 bg-gradient-to-b from-black via-gray-900 to-black"
        },
            React.createElement('div', { className: "max-w-7xl mx-auto" },
                React.createElement('div', { className: "text-center mb-16" },
                    React.createElement('h2', { className: "text-4xl sm:text-5xl font-bold text-gray-100 mb-4 tracking-tight" }, 'OUR SERVICES'),
                    React.createElement('div', { className: "w-24 h-1 bg-gray-400 mx-auto mb-6" }),
                    React.createElement('p', { className: "text-gray-400 text-lg max-w-2xl mx-auto" }, 'Premium training programs designed to help you achieve your fitness goals')
                ),
                React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" },
                    services.map((service, idx) =>
                        React.createElement('div', {
                            key: idx,
                            className: "bg-gradient-to-br from-gray-900 to-gray-800 p-8 border border-gray-700 hover:border-gray-500 transition-all cursor-pointer hover:transform hover:-translate-y-2"
                        },
                            React.createElement(Icon, { name: service.icon, className: "w-12 h-12 text-gray-400 mb-4" }),
                            React.createElement('h3', { className: "text-xl font-bold text-gray-100 mb-3 tracking-wide" }, service.title),
                            React.createElement('p', { className: "text-gray-400 leading-relaxed" }, service.desc)
                        )
                    )
                )
            )
        ),

        // Gallery Section
        React.createElement('section', {
            id: 'gallery',
            className: "py-24 px-4 bg-black"
        },
            React.createElement('div', { className: "max-w-7xl mx-auto" },
                React.createElement('div', { className: "text-center mb-16" },
                    React.createElement('h2', { className: "text-4xl sm:text-5xl font-bold text-gray-100 mb-4 tracking-tight" }, 'GALLERY'),
                    React.createElement('div', { className: "w-24 h-1 bg-gray-400 mx-auto mb-6" }),
                    React.createElement('p', { className: "text-gray-400 text-lg" }, 'Experience the aesthetic gym environment')
                ),
                React.createElement('div', { className: "relative max-w-5xl mx-auto" },
                    React.createElement('div', { className: "relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-2xl" },
                        galleryImages.map((img, idx) =>
                            React.createElement('div', {
                                key: idx,
                                className: `absolute inset-0 transition-opacity duration-800 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`
                            },
                                React.createElement('img', {
                                    src: img,
                                    alt: `Gym ${idx + 1}`,
                                    className: "w-full h-full object-cover"
                                }),
                                React.createElement('div', { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" })
                            )
                        )
                    ),
                    React.createElement('button', {
                        onClick: () => { setCurrentSlide((currentSlide - 1 + galleryImages.length) % galleryImages.length); setIsAutoPlaying(false); },
                        className: "absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-gray-100 p-3 rounded-full transition-all backdrop-blur-sm"
                    }, React.createElement(Icon, { name: 'chevron-left' })),
                    React.createElement('button', {
                        onClick: () => { setCurrentSlide((currentSlide + 1) % galleryImages.length); setIsAutoPlaying(false); },
                        className: "absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-gray-100 p-3 rounded-full transition-all backdrop-blur-sm"
                    }, React.createElement(Icon, { name: 'chevron-right' })),
                    React.createElement('div', { className: "flex justify-center gap-2 mt-6" },
                        galleryImages.map((_, idx) =>
                            React.createElement('button', {
                                key: idx,
                                onClick: () => { setCurrentSlide(idx); setIsAutoPlaying(false); },
                                className: `w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-gray-100 w-8' : 'bg-gray-600 hover:bg-gray-400'}`
                            })
                        )
                    )
                )
            )
        ),

        // Certificates Section
        React.createElement('section', {
            id: 'certificates',
            className: "py-24 px-4 bg-gradient-to-b from-black via-gray-900 to-black"
        },
            React.createElement('div', { className: "max-w-7xl mx-auto" },
                React.createElement('div', { className: "text-center mb-16" },
                    React.createElement('h2', { className: "text-4xl sm:text-5xl font-bold text-gray-100 mb-4 tracking-tight" }, 'CERTIFICATIONS'),
                    React.createElement('div', { className: "w-24 h-1 bg-gray-400 mx-auto mb-6" }),
                    React.createElement('p', { className: "text-gray-400 text-lg max-w-2xl mx-auto" }, 'Professionally trained and certified to help you achieve your fitness goals')
                ),
                React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" },
                    certificates.map((cert) =>
                        React.createElement('div', {
                            key: cert.id,
                            onClick: () => setSelectedCert(cert),
                            className: "bg-gray-900 border border-gray-700 hover:border-gray-500 rounded-lg overflow-hidden cursor-pointer transition-all hover:transform hover:-translate-y-2 hover:shadow-2xl group"
                        },
                            React.createElement('div', { className: "relative overflow-hidden" },
                                React.createElement('img', {
                                    src: cert.image,
                                    alt: cert.title,
                                    className: "w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                }),
                                React.createElement('div', { className: "absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" })
                            ),
                            React.createElement('div', { className: "p-4" },
                                React.createElement('h3', { className: "text-lg font-bold text-gray-100 mb-2" }, cert.title),
                                React.createElement('p', { className: "text-sm text-gray-400 mb-1" }, cert.organization),
                                React.createElement('p', { className: "text-xs text-gray-500" }, cert.year)
                            )
                        )
                    )
                )
            )
        ),

        // Contact Section
        React.createElement('section', {
            id: 'contact',
            className: "py-24 px-4 bg-black"
        },
            React.createElement('div', { className: "max-w-7xl mx-auto" },
                React.createElement('div', { className: "text-center mb-16" },
                    React.createElement('h2', { className: "text-4xl sm:text-5xl font-bold text-gray-100 mb-4 tracking-tight" }, 'CONTACT US'),
                    React.createElement('div', { className: "w-24 h-1 bg-gray-400 mx-auto mb-6" }),
                    React.createElement('p', { className: "text-gray-400 text-lg" }, 'Get in touch and start your transformation journey')
                ),
                React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-12" },
                    React.createElement('div', null,
                        React.createElement('form', { onSubmit: handleSubmit, className: "space-y-6" },
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Full Name',
                                value: formData.name,
                                onChange: (e) => setFormData({...formData, name: e.target.value}),
                                className: "w-full px-6 py-4 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-700 transition-all"
                            }),
                            React.createElement('input', {
                                type: 'email',
                                placeholder: 'Email Address',
                                value: formData.email,
                                onChange: (e) => setFormData({...formData, email: e.target.value}),
                                className: "w-full px-6 py-4 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-700 transition-all"
                            }),
                            React.createElement('input', {
                                type: 'tel',
                                placeholder: 'Phone Number',
                                value: formData.phone,
                                onChange: (e) => setFormData({...formData, phone: e.target.value}),
                                className: "w-full px-6 py-4 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-700 transition-all"
                            }),
                            React.createElement('textarea', {
                                placeholder: 'Your Message',
                                rows: 5,
                                value: formData.message,
                                onChange: (e) => setFormData({...formData, message: e.target.value}),
                                className: "w-full px-6 py-4 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-700 transition-all resize-none"
                            }),
                            formStatus && React.createElement('div', {
                                className: `flex items-center gap-2 p-4 ${formStatus.type === 'success' ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`
                            },
                                React.createElement(Icon, { name: formStatus.type === 'success' ? 'check-circle' : 'alert-circle', className: "w-5 h-5" }),
                                React.createElement('span', { className: formStatus.type === 'success' ? 'text-green-300' : 'text-red-300' }, formStatus.message)
                            ),
                            React.createElement('button', {
                                type: 'submit',
                                disabled: loading,
                                className: "w-full px-10 py-4 bg-gray-100 text-black font-bold text-lg tracking-wide hover:bg-gray-300 transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
                            }, loading ? 'SENDING...' : 'SEND MESSAGE')
                        )
                    ),
                    React.createElement('div', { className: "space-y-8" },
                        React.createElement('div', { className: "bg-gray-900 p-8 border border-gray-700 hover:border-gray-500 transition-all" },
                            React.createElement('h3', { className: "text-2xl font-bold text-gray-100 mb-6 tracking-wide" }, 'GET IN TOUCH'),
                            React.createElement('div', { className: "space-y-4" },
                                React.createElement('div', { className: "flex items-start gap-4 group" },
                                    React.createElement(Icon, { name: 'map-pin', className: "w-6 h-6 text-gray-400 mt-1 flex-shrink-0 group-hover:text-gray-200 transition-colors" }),
                                    React.createElement('div', null,
                                        React.createElement('p', { className: "font-semibold text-gray-200" }, 'Address'),
                                        React.createElement('p', { className: "text-gray-400 group-hover:text-gray-300 transition-colors" }, 'Sundar Vihar Colony, Station Rd, near DIG Basti, Civil Lines, Jhansi, Uttar Pradesh 284001')
                                    )
                                ),
                                React.createElement('div', { className: "flex items-start gap-4 group" },
                                    React.createElement(Icon, { name: 'phone', className: "w-6 h-6 text-gray-400 mt-1 flex-shrink-0 group-hover:text-gray-200 transition-colors" }),
                                    React.createElement('div', null,
                                        React.createElement('p', { className: "font-semibold text-gray-200" }, 'Phone'),
                                        React.createElement('p', { className: "text-gray-400 group-hover:text-gray-300 transition-colors" }, '+91 76519 23441')
                                    )
                                ),
                                React.createElement('div', { className: "flex items-start gap-4 group" },
                                    React.createElement(Icon, { name: 'mail', className: "w-6 h-6 text-gray-400 mt-1 flex-shrink-0 group-hover:text-gray-200 transition-colors" }),
                                    React.createElement('div', null,
                                        React.createElement('p', { className: "font-semibold text-gray-200" }, 'Email'),
                                        React.createElement('p', { className: "text-gray-400 group-hover:text-gray-300 transition-colors" }, 'info@aestheticgym.com')
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { className: "bg-gray-900 p-8 border border-gray-700 hover:border-gray-500 transition-all" },
                            React.createElement('h3', { className: "text-xl font-bold text-gray-100 mb-4" }, 'FIND US'),
                            React.createElement('div', { className: "h-64 rounded overflow-hidden" },
                                React.createElement('iframe', {
                                    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.3748193741895!2d78.55849507542552!3d25.451896877571033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397776f5b0000001%3A0x1234567890abcdef!2sSundar%20Vihar%20Colony%2C%20Civil%20Lines%2C%20Jhansi%2C%20Uttar%20Pradesh%20284001!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin",
                                    width: "100%",
                                    height: "100%",
                                    style: { border: 0 },
                                    allowFullScreen: true,
                                    loading: "lazy",
                                    className: "grayscale hover:grayscale-0 transition-all duration-500"
                                })
                            )
                        )
                    )
                )
            )
        ),

        // Footer
        React.createElement('footer', { className: "bg-black border-t border-gray-800 py-12 px-4" },
            React.createElement('div', { className: "max-w-7xl mx-auto" },
                React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" },
                    React.createElement('div', null,
                        React.createElement('div', { className: "flex items-center space-x-3 mb-4" },
                            React.createElement('img', { src: "https://i.imgur.com/8QZ5yXg.png", alt: "Aesthetic Gym", className: "w-10 h-10" }),
                            React.createElement('span', { className: "text-xl font-bold text-gray-200 tracking-tight" }, 'AESTHETIC GYM')
                        ),
                        React.createElement('p', { className: "text-gray-500 leading-relaxed" }, 'Transform your body and mind in our premium training facility. Excellence is our standard.')
                    ),
                    React.createElement('div', null,
                        React.createElement('h4', { className: "text-gray-200 font-bold mb-4 tracking-wide" }, 'QUICK LINKS'),
                        React.createElement('div', { className: "space-y-2" },
                            ['home', 'services', 'gallery', 'certificates', 'contact'].map(link =>
                                React.createElement('button', {
                                    key: link,
                                    onClick: () => scrollToSection(link),
                                    className: "block text-gray-500 hover:text-gray-300 transition-colors capitalize"
                                }, link)
                            )
                        )
                    ),
                    React.createElement('div', null,
                        React.createElement('h4', { className: "text-gray-200 font-bold mb-4 tracking-wide" }, 'FOLLOW US'),
                        React.createElement('div', { className: "flex gap-4" },
                            React.createElement('a', { href: "#", className: "text-gray-500 hover:text-gray-300 transition-all transform hover:scale-110" }, 
                                React.createElement(Icon, { name: 'instagram' })
                            ),
                            React.createElement('a', { href: "#", className: "text-gray-500 hover:text-gray-300 transition-all transform hover:scale-110" }, 
                                React.createElement(Icon, { name: 'facebook' })
                            ),
                            React.createElement('a', { href: "#", className: "text-gray-500 hover:text-gray-300 transition-all transform hover:scale-110" }, 
                                React.createElement(Icon, { name: 'twitter' })
                            )
                        )
                    )
                ),
                React.createElement('div', { className: "border-t border-gray-800 pt-8 text-center text-gray-600 text-sm" },
                    React.createElement('p', null, '© 2026 Aesthetic Gym. All rights reserved. Built for excellence.')
                )
            )
        )
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(AestheticGym));
