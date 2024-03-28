'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Consultation = () => {
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
        setFormData({
            ...query,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let errors = {};
        let isValid = true;

        // Validate Name
        if (!query.fullName.trim()) {
            errors.fullName = 'Name is required';
            isValid = false;
        }

        // Validate Email
        if (!query.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(query.email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }

        // Validate Practice Name
        if (!query.practiceName.trim()) {
            errors.practiceName = 'Practice Name is required';
            isValid = false;
        }

        // Update form errors state
        setFormErrors(errors);

        // If form is valid, submit data
        if (isValid) {
            try {
                const response = await fetch('/api/consultations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query)
                });
                if (response.ok) {
                    // Handle successful form submission
                    console.log('Form submitted successfully!');
                } else {
                    console.error('Failed to submit form');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };


    return (
        <main className="bg-primary text-white px-4 py-8 flex flex-col items-center justify-center min-h-screen w-screen max-w-full ">

            <Link href='/' className="md:absolute top-5 left-5" >
                <Image
                    className="mx-auto h-fit w-36"
                    src={'/mbmb-white.png'}
                    width={250}
                    height={180}
                    alt="Medical Billing Miami Beach | Company | Medical Reveneu Management | Healthcare Coding"
                />
            </Link>
            <h1 className=" text-4xl font-semibold text-center my-14 lg:my-20">Medical Billing Miami Beach</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <Image
                        src="/raster/join-medical-billing-coding-miami-beach-today.webp"
                        alt="Medical Billing and Coding"
                        width={700}
                        height={400}
                    />
                </div>
                <div className="my-8 ">
                    <h2 className="text-xl font-semibold mb-4">Consultation Form</h2>
                    <form id='consultation' onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4  font-sans">
                        <div>
                            <label htmlFor="fullName" className="block mb-1">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={query.fullName} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            {formErrors.fullName && <p className="text-red-500 mt-1">{formErrors.fullName}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1">Email</label>
                            <input type="email" id="email" name="email" value={query.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            {formErrors.email && <p className="text-red-500 mt-1">{formErrors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="practiceName" className="block mb-1">Practice Name</label>
                            <input type="text" id="practiceName" name="practiceName" value={query.practiceName} onChange={handleChange} placeholder="Practice Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                            {formErrors.practiceName && <p className="text-red-500 mt-1">{formErrors.practiceName}</p>}
                        </div>
                        <div className="col-span-2 ">
                            <label htmlFor="message" className="block mb-1">Message (optional)</label>
                            <textarea id="message" name="message" value={query.message} onChange={handleChange} rows="4" placeholder="Message" className=" text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
                        </div>
                        <div className="col-span-2 flex py-6">
                            <button type="submit" className="w-full max-w-sm mx-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                        </div>
                    </form>
                </div>
            </div>


        </main>
    );
};

export default Consultation;
