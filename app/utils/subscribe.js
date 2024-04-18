'use client'

import Image from "next/image";
import React from "react";


const status = {
    Submitting: {
        image: '',
        headerColor: 'bg-my_black',
        title: 'Hang tight!',
        class: 'text-teal_dark',
        message: 'We are excited to bring your ideas to life. System is processing your service request.',
        actions: [],
    },
    Success: {
        image: '/svg/success.svg'
    },
    Error: {
        image: '/svg/error.svg'
    }
};

export default function Subscribe() {
    const [email, setEmail] = React.useState('');
    const [submitting, setSubmitting] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = (value) => emailRegex.test(value);
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setSubmitting('Submitting');
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(email),
            });
            const data = await response.json();
            setSubmitting(data.message)
        } catch (error) {
            setSubmitting('Error');
        }
    };
    React.useEffect(() => {
        setIsValid(isValidEmail(email))
    }, [email])
    return (
        <form
            className="flex overflow-hidden max-w-lg min-w-96 mx-auto lg:mx-2 h-10 my-6 px-1 border-teal_dark border-x-4"
        >
            <input
                name="email"
                disabled={submitting === 'Submitting'}
                value={email}
                onChange={(e) => [setEmail(e.target.value), setSubmitting('')]}
                type="email"
                className={`flex-grow w-full border px-1 py-1 focus:outline-none ${submitting === 'Submitting' ? 'grayscale cursor-not-allowed' : ' grayscale-0'} ${!isValid ? 'text-rose-500' : 'text-teal_dark'}`}
                placeholder=" Enter email"
                required
            />
            {
                submitting !== ''
                    ? (
                        submitting === 'Submitting'
                            ? <footer className="flex items-center" > <div className="loader-1 mx-3 " /></footer>
                            : <Image src={`${status[submitting].image}`} width={25} height={20} alt={`${submitting} icon | New Form MyAbabeel`} className="inline-flex mx-2 " />
                    )
                    : <button
                    aria-label="submit button"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={`text-xs lg:text-sm tracking-widest font-sans uppercase font-semibold flex-shrink bg-teal_dark py-1 min-w-max px-3 ${(email !== '' && !isValid) ? ' grayscale cursor-not-allowed' : ' grayscale-0'}`}
                    >
                        {"Subscribe"}
                    </button>
            }
        </form>

    )
}