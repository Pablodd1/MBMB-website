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
    if (!isValidEmail(email)) return;
    setSubmitting('Submitting');
    try {
      const response = await fetch('/my-api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });
      const data = await response.json();
      setSubmitting(data.message || 'Success');
    } catch (error) {
      setSubmitting('Error');
    }
  };

  React.useEffect(() => {
    setIsValid(isValidEmail(email));
  }, [email]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex overflow-hidden w-full max-w-full min-w-0 h-10 my-4 px-1 border-teal_dark border-x-4 rounded-sm bg-white"
      aria-label="Florida Compliance Alerts Newsletter"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address for Florida Compliance Alerts
      </label>
      <input
        id="newsletter-email"
        name="email"
        disabled={submitting === 'Submitting'}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setSubmitting('');
        }}
        type="email"
        className={`flex-grow min-w-0 w-full bg-white border-0 px-2.5 py-1 text-sm focus:outline-none ${
          submitting === 'Submitting' ? 'grayscale cursor-not-allowed' : 'grayscale-0'
        } ${email && !isValid ? 'text-rose-600' : 'text-slate-900'}`}
        placeholder="Enter work email"
        required
      />
      {submitting !== '' ? (
        submitting === 'Submitting' ? (
          <div className="flex items-center">
            <div className="loader-1 mx-3" />
          </div>
        ) : (
          <Image
            src={status[submitting]?.image || '/svg/success.svg'}
            width={25}
            height={20}
            alt={`${submitting} status`}
            className="inline-flex mx-2 self-center"
          />
        )
      ) : (
        <button
          aria-label="Subscribe to Florida Compliance Alerts"
          type="submit"
          disabled={!isValid}
          className={`text-xs tracking-wider font-sans uppercase font-bold shrink-0 bg-teal_dark text-slate-950 py-1 px-3 cursor-pointer ${
            email !== '' && !isValid ? 'grayscale cursor-not-allowed opacity-60' : 'hover:opacity-90'
          }`}
        >
          Subscribe
        </button>
      )}
    </form>
  );
}