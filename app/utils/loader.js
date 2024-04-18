import Image from "next/image";
import Link from "next/link";


export default function LoaderFullPage() {

    return (

        <section className='fixed top-0 w-full h-full flex flex-col  items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm z-20 cursor-wait '>
            <Image
                className="mx-auto h-fit w-52 my-12 top-2 fixed"
                src={'/mbmb-black.png'}
                width={350}
                height={180}
                alt="Medical Billing Miami Beach | Company | Medical Reveneu Management | Healthcare Coding"
            />
            <div className='loader-1 self-center text-primary ' />
            <aside className='bottom-0 fixed px-4 py-3 mt-8  lg:my-1 w-full flex items-center justify-center lg:w-max font-sans font-semibold text-xs sm:text-sm bg-gradient-to-t from-gray-400 to-transparent z-30 cursor-auto ' >
                {/* <Image src={'/svg/info.svg'} loading='lazy' width={16} height={20} alt='icon MyAbabeel info about this website developer and designer' className='  mr-1 inline-flex' /> */}
                <Image src={'https://www.myababeel.com/logo.svg'} loading='lazy' width={37} height={20} alt='logo MyAbabeel | React.js Next.js express.js js Developer  | designer | on-page SEO consultant company' className=' inline-flex' />
                Designed & Developed By
                <Link className='mx-1 font-sans tracking-wide ' target={"_blank"} href={'https://www.myababeel.com'} >
                    My<strong className=' text-myababeel2' >Ababeel</strong>
                </Link>
            </aside>
        </section>



    )
}
