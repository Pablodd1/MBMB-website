// LinkToAIScriber.jsx

import Image from 'next/image';
import Link from 'next/link';

const LinkToAIDynamic = () => {
    return (
        <article className="shine text-center relative w-11/12 px-5 py-12 md:py-0 max-w-full lg:max-w-3xl mx-auto overflow-hidden flex flex-col md:flex-row items-center justify-end bg-gradient-to-br from-purple-500 via-purple-400 to-purple-500 rounded-xl shadow-2xl shadow-gray-800 ">
            <Image
                src={`/raster/AI-Dynamic-logo.png`}
                alt={'AI Medical Scriber'}
                width={120}
                height={14}
                className={'inline-block rounded-lg mr-1 w-24 md:w-32'}
            />
            <footer className=" grow text-gray-50 text-md font-semibold uppercase tracking-wide text-left font-sans  px-12 z-10  ">
                Explore Our
                <Link href="https://www.aimedicalscriber.com/" target='_blank' className='flex items-center font-bold' >
                    <h2 className="mr-3 text-xl sm:text-2xl tracking-wide"><span className=' text-black'>AI Dynamics</span> </h2>
                    <Image
                        src={`/svg/arrow-white.svg`}
                        alt={'AI Medical Scriber'}
                        width={20}
                        height={14}
                        className={'inline-block mr-1 w-4 md:w-6'}
                    />
                </Link>
            </footer>
            <div className='absolute right-0 flex ' >
                <div className=" -skew-x-12 w-12 min-h-full h-40 bg-gradient-to-b from-indigo-500 to-transparent "> </div>
                <div className=" -skew-x-12 w-12 min-h-full h-40 bg-gradient-to-b from-indigo-600 to-transparent "> </div>
                <div className=" -skew-x-12 w-12 min-h-full h-40 bg-gradient-to-b from-indigo-400 to-transparent "> </div>
            </div>
        </article>
    );
};

export default LinkToAIDynamic;
