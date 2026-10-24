'use client'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
const Alert = dynamic(() => import('@UTILS/alert'));
const className = "w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/30 shadow-sm font-medium transition-all"

let isValid = true;
const Consultation = () => {
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

    const handleChange = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { name, value, placeholder } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        switch (name) {
            case "email":
                if (!value.trim()) setFormErrors((x) => ({ ...x, [name]: 'Email is required' }));
                else if (!emailRegex.test(value)) setFormErrors((x) => ({ ...x, [name]: 'Invalid Email Format' }));
                else setFormErrors((x) => ({ ...x, [name]: '' }));
                break;
            default:
                if (!value.trim()) setFormErrors((x) => ({ ...x, [name]: `${placeholder} is Required` }));
                else setFormErrors((x) => ({ ...x, [name]: '' }));
                break;
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/my-api/consultations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            });
            const data = await response.json();
            if (response.ok) {
                setAlert({ message: '✅ Registration successful! We will contact you within 24 hours to schedule your free audit.', type: 'success' });
            } else {
                setAlert({ message: data.error || 'Something went wrong. Please try again or call (786) 643-2099.', type: 'alert' });
            }
        } catch (error) {
            setAlert({ message: 'Connection error. Please call (786) 643-2099 to register.', type: 'alert' });
        }
        finally {
            setSubmitting(false);
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
        }
    };


    return (
        <main className="bg-primary text-white px-4 py-10 flex flex-col items-center justify-center min-h-screen w-screen max-w-full">
            <div className="max-w-6xl w-full mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-center my-8 lg:my-12">
                    Medical Billing Miami Beach
                    <span className="text-[#00A8E8] block mt-2">Free 48-Hour Billing Audit Registration</span>
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl">
                    <div className='h-full relative'>
                        <Image
                            src="/raster/join-medical-billing-coding-miami-beach-today.webp"
                            alt="Medical Billing and Coding Audit Registration Miami Beach"
                            className='object-cover h-full rounded-2xl mx-auto shadow-lg border border-white/10'
                            width={700}
                            height={450}
                        />
                        <div className="mt-4 bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 text-white">
                            <p className="text-sm font-semibold text-cyan-300 text-center">✅ No obligation · ✅ No setup fees · ✅ Results in 48 hours</p>
                        </div>
                    </div>
                    <div className="py-2">
                        <div className="mb-6 p-5 bg-gradient-to-r from-[#0066CC]/25 to-[#00A8E8]/15 border border-[#00A8E8]/40 rounded-2xl">
                            <h2 className="text-2xl font-bold text-white mb-2">🎯 Free Revenue Cycle Audit</h2>
                            <p className="text-slate-300 text-sm leading-relaxed">Register below and our AAPC-certified team will analyze your practice&apos;s billing &amp; coding workflow to uncover hidden revenue leaks and denied claims.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center">
                                <p className="text-xl font-extrabold text-[#00A8E8]">98%</p>
                                <p className="text-[11px] text-slate-300">Clean Claim Rate</p>
                            </div>
                            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center">
                                <p className="text-xl font-extrabold text-emerald-400">+30%</p>
                                <p className="text-[11px] text-slate-300">Revenue Recovery</p>
                            </div>
                            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center">
                                <p className="text-xl font-extrabold text-[#00A8E8]">48h</p>
                                <p className="text-[11px] text-slate-300">Audit Turnaround</p>
                            </div>
                            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-center">
                                <p className="text-xl font-extrabold text-emerald-400">$0</p>
                                <p className="text-[11px] text-slate-300">Setup Cost</p>
                            </div>
                        </div>
                        
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
                            <span className="text-slate-200 text-sm font-medium">📞 Prefer to speak with Jass / our team right now?</span>
                            <a href="tel:+17866432099" className="text-emerald-400 font-bold text-sm hover:underline">Call (786) 643-2099 →</a>
                        </div>

                        <form id='consultation' onSubmit={handleSubmit} className={`grid grid-cols-1 md:grid-cols-2 gap-4 font-sans ${submitting ? 'opacity-45 cursor-wait grayscale' : ''}`}>
                            <div>
                                <label htmlFor="fullName" className="block mb-1.5 text-sm font-semibold text-slate-200">Full Name *</label>
                                <input type="text" id="fullName" name="fullName" value={query ? query.fullName : ''} onChange={handleChange} placeholder="Dr. Jane Smith" className={`${className} ${submitting ? 'cursor-wait' : ''}`} required />
                                {formErrors?.fullName && <p className="text-rose-400 text-xs mt-1">{formErrors.fullName}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1.5 text-sm font-semibold text-slate-200">Work Email *</label>
                                <input type="email" id="email" name="email" value={query ? query.email : ''} onChange={handleChange} placeholder="doctor@practice.com" className={`${className} ${submitting ? 'cursor-wait' : ''}`} required />
                                {formErrors?.email && <p className="text-rose-400 text-xs mt-1">{formErrors.email}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="practiceName" className="block mb-1.5 text-sm font-semibold text-slate-200">Practice Name &amp; Specialty *</label>
                                <input type="text" id="practiceName" name="practiceName" value={query ? query.practiceName : ''} onChange={handleChange} placeholder="Miami Beach Cardiology Associates" className={`${className} ${submitting ? 'cursor-wait' : ''}`} required />
                                {formErrors?.practiceName && <p className="text-rose-400 text-xs mt-1">{formErrors.practiceName}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="message" className="block mb-1.5 text-sm font-semibold text-slate-200">Phone Number / Billing Goals (Optional)</label>
                                <textarea id="message" name="message" value={query ? query.message : ''} onChange={handleChange} rows="3" placeholder="Share your phone number, current EHR, or biggest billing challenge..." className={`${className} ${submitting ? 'cursor-wait' : ''}`}></textarea>
                            </div>
                            <div className="md:col-span-2 flex pt-3">
                                <button type="submit" className={`w-full py-3.5 px-6 rounded-xl font-bold text-base shadow-lg transition duration-300 ${submitting ? 'bg-gray-500 opacity-45 cursor-wait' : 'bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white hover:opacity-95 shadow-blue-600/25 cursor-pointer'}`}>
                                    {
                                        submitting
                                            ? <div className='loader-1 self-center text-primary mx-auto' />
                                            : "Claim My Free 48-Hour Billing Audit →"
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

export default Consultation;
