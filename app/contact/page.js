'use client'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
const Alert = dynamic(() => import('@UTILS/alert'));
const className = "w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/30 shadow-sm font-medium transition-all"

const Contact = () => {
    const [submitting, setSubmitting] = useState(false)
    const [alert, setAlert] = useState({});
    const [query, setFormData] = useState({
        fullName: '',
        email: '',
        practiceName: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({
        fullName: '',
        email: '',
        practiceName: ''
    });

    const fieldLabels = {
        fullName: 'Full Name',
        email: 'Business Email',
        practiceName: 'Practice or Firm Name',
    };

    const handleChange = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        switch (name) {
            case "email":
                if (!value.trim()) setFormErrors((x) => ({ ...x, [name]: 'Business Email is required' }));
                else if (!emailRegex.test(value)) setFormErrors((x) => ({ ...x, [name]: 'Invalid Email Format' }));
                else setFormErrors((x) => ({ ...x, [name]: '' }));
                break;
            case "message":
                break;
            default:
                if (!value.trim()) setFormErrors((x) => ({ ...x, [name]: `${fieldLabels[name] || 'This field'} is required` }));
                else setFormErrors((x) => ({ ...x, [name]: '' }));
                break;
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/my-api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            });
            const data = await response.json();
            if (response.ok) {
                setAlert({ message: '✅ Message sent! We will contact you within 24 hours.', type: 'success' });
                setFormData({
                    fullName: '',
                    email: '',
                    practiceName: '',
                    message: ''
                });
                setFormErrors({
                    fullName: '',
                    email: '',
                    practiceName: ''
                });
            } else {
                setAlert({ message: data.error || 'Something went wrong. Please try again or call (786) 643-2099.', type: 'alert' });
            }
        } catch (error) {
            setAlert({ message: 'Connection error. Please call (786) 643-2099.', type: 'alert' });
        }
        finally {
            setSubmitting(false);
        }
    };


    return (
        <main className="bg-primary text-white px-4 py-10 flex flex-col items-center justify-center min-h-screen w-full max-w-full overflow-x-hidden">
            <div className="max-w-6xl w-full mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-center my-8 lg:my-12">Medical Billing Miami Beach <span className="text-[#00A8E8] block mt-2">Contact Us</span></h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
                    <div className='h-full relative'>
                        <Image
                            src="/raster/authentic/contact-miami-coord-hub.jpg"
                            alt="Medical Billing Miami Beach Client Coordination Hub"
                            className='object-cover h-full rounded-2xl mx-auto shadow-lg border border-white/10'
                            width={700}
                            height={400}
                        />
                    </div>
                    <div className="py-2">
                        <h2 className="text-2xl font-bold mb-3">Get in Touch With Our Team</h2>
                        <p className="text-slate-300 mb-6 text-sm">Have questions about our medical billing services or our administrative billing-support pilot for law firms? Fill out the form below and we&apos;ll get back to you within 1 business day.</p>
                        
                        <div className="mb-6 p-4 bg-[#0066CC]/20 border border-[#00A8E8]/30 rounded-xl">
                            <p className="text-sm text-slate-200"><strong className="text-white">Direct Contact:</strong></p>
                            <p className="text-sm text-slate-200 mt-1">📞 <a href="tel:+17866432099" className="text-[#00A8E8] font-bold hover:underline">(786) 643-2099</a></p>
                            <p className="text-sm text-slate-200">📧 <a href="mailto:Jasmel@medicalbillingmb.com" className="text-[#00A8E8] hover:underline">Jasmel@medicalbillingmb.com</a></p>
                            <p className="text-xs text-slate-400 mt-2">Mon-Fri: 9AM-6PM EST (Eastern Time — America/New_York)</p>
                        </div>
                        
                        <form id='contact' onSubmit={handleSubmit} className={`grid grid-cols-1 md:grid-cols-2 gap-4 font-sans ${submitting ? 'opacity-45 cursor-wait grayscale' : ''}`}>
                            <div>
                                <label htmlFor="fullName" className="block mb-1.5 text-sm font-semibold text-slate-200">Full Name *</label>
                                <input type="text" id="fullName" name="fullName" value={query ? query.fullName : ''} onChange={handleChange} placeholder="Dr. Jane Smith" className={`${className} ${submitting ? 'cursor-wait' : ''}`} required />
                                {formErrors?.fullName && <p className="text-rose-400 text-xs mt-1">{formErrors.fullName}</p>}
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block mb-1.5 text-sm font-semibold text-slate-200">Business Email *</label>
                                <input type="email" id="email" name="email" value={query ? query.email : ''} onChange={handleChange} placeholder="doctor@practice.com" className={`${className} ${submitting ? 'cursor-wait' : ''}`} required />
                                {formErrors?.email && <p className="text-rose-400 text-xs mt-1">{formErrors.email}</p>}
                            </div>
                            
                            <div className="md:col-span-2">
                                <label htmlFor="practiceName" className="block mb-1.5 text-sm font-semibold text-slate-200">Practice or Firm Name *</label>
                                <input type="text" id="practiceName" name="practiceName" value={query ? query.practiceName : ''} onChange={handleChange} placeholder="Practice or Organization Name" className={`${className} ${submitting ? 'cursor-wait' : ''}`} required />
                                {formErrors?.practiceName && <p className="text-rose-400 text-xs mt-1">{formErrors.practiceName}</p>}
                            </div>
                            
                            <div className="md:col-span-2">
                                <label htmlFor="message" className="block mb-1.5 text-sm font-semibold text-slate-200">Message (optional)</label>
                                <textarea id="message" name="message" value={query ? query.message : ''} onChange={handleChange} rows="4" aria-describedby="contact-phi-warning" placeholder="How can we help your practice or organization?" className={`${className} ${submitting ? 'cursor-wait' : ''}`}></textarea>
                                <p id="contact-phi-warning" className="mt-2 text-xs text-amber-200 bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2 leading-relaxed">
                                    <strong>Important Privacy Notice:</strong> Do not include patient names, dates of birth, medical records, insurance IDs, or other sensitive information in this form. Review our{' '}
                                    <Link href="/privacy-policy" className="text-[#00A8E8] underline font-semibold hover:text-white">
                                        Privacy Policy
                                    </Link>.
                                </p>
                            </div>
                            
                            <div className="md:col-span-2 flex pt-2">
                                <button type="submit" className={`w-full py-3.5 px-6 rounded-xl font-bold text-base shadow-lg transition duration-300 ${submitting ? 'bg-gray-500 opacity-45 cursor-wait' : 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white hover:opacity-95 cursor-pointer'}`}>
                                    {
                                        submitting
                                            ? <div className='loader-1 self-center text-primary mx-auto' />
                                            : "Send Message →"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            {alert.type && <Alert {...alert} setAlert={setAlert} />}

        </main>
    );
};

export default Contact;
