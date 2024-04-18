import Image from "next/image";

const Alert = ({ message, type = 'success', setAlert }) => {

    const alertClasses = `
      rounded-md shadow-sm font-sans font-semibold flex items-stretch space-x-2 overflow-hidden fixed bottom-10 left-10 z-20
      transition duration-1500 ease-in-out
      ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-rose-50 text-red-600'}
    `;

    return (
        <div className={`  ${alertClasses}`}>
            <Image
                src={`/svg/${type}.svg`}
                alt={` svg ${type} `}
                width={20}
                height={14}
                className=' my-3 ml-4 '
            />
            <p className=' py-3 px-1' >{message}</p>
            <button onClick={() => setAlert(null)} className='px-2 border-l-4 border-gray-300 bg-gray-400' >
                <Image
                    src={`/svg/silent.svg`}
                    alt={` svg ${type} `}
                    width={20}
                    height={14}
                />
            </button>
        </div>
    );
};

export default Alert