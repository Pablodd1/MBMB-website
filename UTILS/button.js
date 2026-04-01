import React from 'react';
import Link from 'next/link';

const Button = ({ href = '', text = 'Send Email', className = ' max-w-5xl mx-auto', colors = 'bg-black text-white hover:bg-myblack' }) => {
    return (
        <div className={` ${className}`}>
            <Link
                className={`inline-flex items-center justify-center gap-2 text-sm lg:text-lg px-6 py-3 rounded-lg font-semibold shadow-md ${colors} w-full md:w-auto`}
                href={href || ''}
            >
                <span>{text}</span>
            </Link>
        </div>
    );
};

export default Button;