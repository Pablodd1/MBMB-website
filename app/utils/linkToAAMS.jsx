// LinkToAIScriber.jsx

import Image from 'next/image';
import Link from 'next/link';

const LinkToAIMS = () => {
    return (
        <article className="shine text-center relative w-11/12 mb-20 mt-12 py-12 md:py-0 max-w-3xl mx-auto overflow-hidden flex flex-col md:flex-row items-center justify-end bg-gradient-to-br from-blue-400 via-teal-400 to-indigo-500 rounded-xl shadow-2xl shadow-gray-800 ">
            <Image
                src={`/svg/AI-docs.svg`}
                alt={'AI Medical Scriber'}
                width={120}
                height={14}
                className={'inline-block -rotate-45 mr-1 w-20 md:w-24'}
            />
            <footer className="text-gray-50 text-md font-semibold uppercase tracking-wide text-left font-sans  px-12  ">
                Explore Our
                <Link href="https://www.aimedicalscriber.com/" target='_blank' className='flex items-center font-bold' >
                    <h2 className="mr-3 text-xl sm:text-2xl tracking-wide"><span className=' text-blue-900'>AI Medical Scriber</span> </h2>
                    <Image
                        src={`/svg/arrow-white.svg`}
                        alt={'AI Medical Scriber'}
                        width={20}
                        height={14}
                        className={'inline-block mr-1 w-4 md:w-6'}
                    />
                </Link>
            </footer>
            <div className='absolute right-0 flex md:static' >
                <div className=" -skew-x-12 w-12 min-h-full h-40 bg-gradient-to-b from-blue-500 to-transparent "> </div>
                <div className=" -skew-x-12 w-12 min-h-full h-40 bg-gradient-to-b from-indigo-600 to-transparent "> </div>
                <div className=" -skew-x-12 w-12 min-h-full h-40 bg-gradient-to-b from-green-400 to-transparent "> </div>
            </div>
        </article>
    );
};

export default LinkToAIMS;
