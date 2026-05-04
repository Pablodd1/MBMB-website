'use client'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
const Alert = dynamic(() => import('@UTILS/alert'));
const className = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"

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
                break;
            default:
                if (!value.trim()) setFormErrors((x) => ({ ...x, [name]: `${placeholder} is Required` }));
                break;
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('https://ownership-acute-show-slight.trycloudflare.com/consultation', {
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
        <main className="bg-primary text-white px-4 py-8 flex flex-col items-center justify-center min-h-max w-screen max-w-full ">
            <Link href='/' className="md:absolute top-5 left-5" >
                <Image
                    className="mx-auto h-fit w-36"
                    src={'/mbmb-white.png'}
                    width={250}
                    height={180}
                    alt="Medical Billing Miami Beach | Company | Medical Reveneu Management | Healthcare Coding"
                />
            </Link>
            <h1 className=" text-3xl md:text-4xl font-semibold text-center my-14 lg:my-20">Medical Billing Miami Beach <span className="text-pink2 block mt-2">Free Billing Audit Registration</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className='h-full relative'>
                    <Image
                        src="/raster/join-medical-billing-coding-miami-beach-today.webp"
                        alt="Medical Billing and Coding"
                        className=' object-cover h-full rounded-2xl mx-auto '
                        width={700}
                        height={400}
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4 text-white">
                        <p className="text-sm font-semibold">✅ No obligation · ✅ No setup fees · ✅ Results in 48 hours</p>
                    </div>
                </div>
                <div className="my-8 py-10 ">
                    <div className="mb-6 p-4 bg-gradient-to-r from-pink-600/20 to-pink-800/20 border border-pink-500/30 rounded-xl">
                        <h2 className="text-2xl font-bold text-white mb-2">🎯 Free Revenue Cycle Audit</h2>
                        <p className="text-gray-300">Register now and our team will analyze your practice's billing process to identify revenue leaks and maximize reimbursements.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-pink-400">95%</p>
                            <p className="text-xs text-gray-300">Denial Reduction</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-pink-400">30%</p>
                            <p className="text-xs text-gray-300">Revenue Increase</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-pink-400">48h</p>
                            <p className="text-xs text-gray-300">Audit Turnaround</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                            <p className="text-2xl font-bold text-pink-400">$0</p>
                            <p className="text-xs text-gray-300">Setup Cost</p>
                        </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 text-sm">📞 Prefer to talk? Call us at <a href="tel:+17866432099" className="text-pink-400 font-bold hover:underline">(786) 643-2099</a></p>
                    <form id='consultation' onSubmit={handleSubmit} className={`grid grid-cols-1 md:grid-cols-2 gap-4  font-sans ${submitting && 'opacity-45 cursor-wait grayscale'} `}>
                        <div>
                            <label htmlFor="fullName" className="block mb-1">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={query ? query.fullName : ''} onChange={handleChange} placeholder="Full Name" className={` ${className} ${submitting && 'cursor-wait'}`} required />
                            {formErrors?.fullName && <p className="text-rose-300 mt-1">{formErrors.fullName}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1">Email</label>
                            <input type="email" id="email" name="email" value={query ? query.email : ''} onChange={handleChange} placeholder="Email" className={`${className} ${submitting && 'cursor-wait'}`} required />
                            {formErrors?.email && <p className="text-rose-300 mt-1">{formErrors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="practiceName" className="block mb-1">Practice Name</label>
                            <input type="text" id="practiceName" name="practiceName" value={query ? query.practiceName : ''} onChange={handleChange} placeholder="Practice Name" className={`${className} ${submitting && 'cursor-wait'}`} required />
                            {formErrors?.practiceName && <p className="text-rose-300 mt-1">{formErrors.practiceName}</p>}
                        </div>
                        <div className={`col-span-2  `}>
                            <label htmlFor="message" className="block mb-1">Message (optional)</label>
                            <textarea id="message" name="message" value={query ? query.message : ''} onChange={handleChange} rows="4" placeholder="Message" className={` text-black ${className} ${submitting && 'cursor-wait'} `}></textarea>
                        </div>
                        <div className="col-span-2 flex py-6">
                            <button type="submit" className={`w-full h-10 max-w-sm flex justify-center mx-auto py-2 px-4 rounded-md  transition duration-300 ${submitting ? ' bg-gray-400 shadow-inner shadow-black opacity-45 cursor-wait' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                                {
                                    submitting
                                        ? <div className='loader-1 self-center text-primary ' />
                                        : "Register for Free Audit"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {alert.type && <Alert {...alert} setAlert={setAlert} />}

        </main>
    );
};

export default Consultation;
