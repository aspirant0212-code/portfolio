'use client'
import React, { useState, useEffect } from 'react'
import { RiMailLine } from '@remixicon/react'
import SlideUp from '@/utlits/animations/slideUp'
import { useSearchParams } from 'next/navigation'
import confetti from 'canvas-confetti'

const ContactForm = () => {
    const searchParams = useSearchParams();
    const planParam = searchParams.get('plan');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        plan: ''
    });

    const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

    useEffect(() => {
        if (planParam) {
            setFormData(prev => ({ ...prev, plan: planParam }));
        }
    }, [planParam]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // REPLACE WITH ACTUAL GOOGLE APPS SCRIPT WEB APP URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbw8JTk8kyVZ4hUyo5P7eWsbCUn2vBx-UHn_fRJAT0kHd7H09f_EbG4NsE9J6JHHMIZ0/exec';

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // Important for Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            setStatus('success');
            setFormData({ name: '', email: '', message: '', plan: '' });

            // Trigger the party pop greeting!
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 10000 // Ensure it renders above the popup modal
            });
        } catch (error) {
            setStatus('error');
            console.error('Error!', error.message);
        }
    };

    return (
        <div className="col-lg-8">
            <SlideUp>
                <div className="contact-form contact-form-area">
                    <form className="contactForm" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" name="name" className="form-control" placeholder="Ranjith Mohan" required value={formData.name} onChange={handleChange} />
                                    <label htmlFor="name" className="for-icon"><i className="far fa-user"></i></label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" name="email" className="form-control" placeholder="hello@example.com" required value={formData.email} onChange={handleChange} />
                                    <label htmlFor="email" className="for-icon"><i className="far fa-envelope"></i></label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="plan">Selected Plan (Optional)</label>
                                    <input type="text" id="plan" name="plan" className="form-control" placeholder="e.g. Basic, Standard, Premium" value={formData.plan} onChange={handleChange} />
                                    <label htmlFor="plan" className="for-icon"><i className="far fa-star"></i></label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="message">Your Message</label>
                                    <textarea name="message" id="message" className="form-control" rows="4" placeholder="Write Your message" required value={formData.message} onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mb-0">
                                    <button type="submit" className="theme-btn" disabled={status === 'loading'}>
                                        {status === 'loading' ? 'Sending...' : 'Send Me Message'} <i><RiMailLine size={15} /></i>
                                    </button>
                                    {status === 'error' && <p className="text-danger mt-3" style={{ color: '#ff4d4f' }}>Oops! Something went wrong.</p>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </SlideUp>

            {/* Custom Thank You Popup Modal */}
            {status === 'success' && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    animation: 'fadeIn 0.3s ease-in-out'
                }}>
                    <div style={{
                        backgroundColor: '#1E1E1E',
                        padding: '40px',
                        borderRadius: '20px',
                        maxWidth: '500px',
                        width: '90%',
                        textAlign: 'center',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(203, 251, 69, 0.2)'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: 'rgba(203, 251, 69, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px auto'
                        }}>
                            <RiMailLine size={40} color="#cbfb45" />
                        </div>
                        <h2 style={{ color: '#fff', marginBottom: '15px' }}>Thank You!</h2>
                        <p style={{ color: '#999', marginBottom: '30px', fontSize: '16px' }}>
                            Your message has been sent successfully. I will get back to you as soon as possible!
                        </p>
                        <button
                            className="theme-btn"
                            onClick={() => setStatus('')}
                            style={{ padding: '12px 30px' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContactForm