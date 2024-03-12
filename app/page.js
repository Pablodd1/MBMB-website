'use client'
import Image from "next/image";
import Link from "next/link";

const solutions = [
  {
    label: "Medical Billing",
    description: "Our team works tirelessly to ensure you receive the maximum reimbursement for your services.",
    href: ""
  },
  {
    label: "Medical Coding",
    description: "Identifying opportunities for process improvement to maintain a current, comprehensive, and compliant Charge Description Master (CDM).",
    href: ""
  },
  {
    label: "Consultaion",
    description: "Access top-tier consulting services to keep your practice at the forefront of industry best practices.",
    href: ""
  }
]
const benefits = [
  {
    label: "Error-Free Claims:",
    description: " Our thorough audit and scrubbing process ensures clean, error-free, and compliant claims, following coding guidelines."
  },
  {
    label: "Recover What's Due:",
    description: "Our specialists follow up on outstanding claims to recover reimbursements owed by insurers."
  },
  {
    label: "Timely Reminders: ",
    description: "Send polite balance reminder calls to patients after the statement cycle, helping them stay informed about their outstanding balances."
  }
]
export default function Home() {
  return (
    <main className=" ">
      <section className="" >
        <Image
          className="absolute w-full h-fit max-h-screen -z-10"
          src={'/raster/mbmb-bg3.jpg'}
          width={4024}
          height={2024}
          alt="d"
        />
        <figure className="w-full  py-16" >
          <Image
            className="mx-auto"
            src={'/mbmb-white.png'}
            width={180}
            height={180}
            alt="d"
          />
        </figure>
        <article className="max-w-7xl mx-auto px-14 py-12 rounded-2xl text-black bg-white bg-opacity-75 brightness-125 backdrop-blur-lg" >
          <header className="" >
            <h1 className="text-6xl text-gray-800 text-center  font-bold  underline  " >
              <strong className="mx-2 font-semibold" >
                Medical Billing
              </strong>
              {/* <br /> */}
              MB
              {/* Miami Beach */}
            </h1>
            <p className="font-semibold text-md text-center my-2" >
              To provide maximum reimburesement for our clients.
            </p>
          </header>
          <p className=" font-serif text-gray-900 mt-8 mb-3 text-lg lg:text-xl max-w-5xl mx-auto">
            <strong className="text-mygreen" > At Medical Billing Miami Beach, </strong>
            our mission is clear: to provide maximum reimbursement for our clients. We understand the complexities of medical billing, coding, and revenue management, and our team of experts is here to help you navigate these challenges. With a focus on precision, compliance, and efficiency, we offer a comprehensive suite of services tailored to meet your specific needs.
          </p>
          <div className="wrapper max-w-5xl mx-auto">
            <Link className="cta bg-mygreen hover:bg-myblack text-lg h-fit w-fit -skew-x-12 shadow-md shadow-primary" href="#">
              <span>Send Email</span>
              <span>
                <svg width="auto" height="23px" viewBox="0 0 66 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                    <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                    <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                  </g>
                </svg>
              </span>
            </Link>
          </div>
        </article>
        <ul className="max-w-7xl grid grid-cols-3 gap-4 mx-auto my-44" >
          {
            solutions.map((x, i) => {
              return (
                <li key={i} className=" min-h-fit pb-4 flex flex-col rounded-xl bg-myblack text-white overflow-hidden " >
                  <h2 className="text-xl font-semibold py-4 px-6 bg-mygreen" >
                    {x.label}
                  </h2>
                  <p className="mt-2 mb-4 px-6 text-md tracking-wider " >
                    {x.description}
                  </p>
                  <div className="justify-self-end bg-white text-primary relative h-8 w-max py-1 px-4 mx-4 mt-auto transition-all ease-in-out duration-500 hover:bg-mygreen hover:text-white btn-1 rounded-md hover:rounded-sm">
                    <Link href={x.href} className="uppercase text-sm font-semibold tracking-wider">
                      Request Now
                    </Link>
                    <svg>
                      <rect x="0" y="0" fill="none" className=" stroke-white" width="100%" height="100%" />
                    </svg>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </section>
      <section className="grid grid-cols-2 gap-2 " >
        <figure className="rounded-2xl overflow-hidden  mx-4" >
          <Image
            className=" h-fit mx-auto "
            src={'/raster/concentrate.jpg'}
            width={4024}
            height={2024}
            alt="d"
          />
        </figure>
        <article className="flex flex-col py-12" >
          <h2 className="text-7xl text-myblack my-12 font-sansita font-semibold leading-8 underline" >
            Expert Professionals
            <br />
            <span className="text-2xl font-normal" >
              Confident Billing Solutions by MBMB
            </span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl w-fit text-justify" >
            Ensure accurate coding for your practice with our team of certified Medical Billing and Coding Specialists, Billing Consultants, and Coding Specialists. Our team has expertise in all specialties and adheres to industry guidelines and standards to meet your medical coding needs. We offer medical coding outsourcing services and provide support for doctor credential services, hospital billing, dispute medical resolution services, and insurance billing consultancy. Trust us to optimize your revenue cycle management and ensure that you receive the reimbursement you deserve.
          </p>
          <div className=" bg-white text-mygreen relative h-9 w-max py-1 px-4 mx-4 my-6 transition-all ease-in-out duration-500 border-2 border-mygreen border-opacity-50 hover:bg-mygreen hover:text-white btn-1 rounded-md hover:rounded-sm">
            <Link href={'#expertise'} className=" text-sm font-semibold tracking-wider ">
              Explore Expertise
            </Link>
            <svg id="rect" >
              <rect x="0" y="0" fill="none" className=" stroke-white" width="100%" height="100%" />
            </svg>
          </div>
        </article>
      </section>
      <ul className="grid grid-cols-3 w-full h-full py-52 px-12" >
        {benefits.map((x, i) => {
          return (
            <li key={i} className={` lg:px-2 lg:py-2 w-2/3 md:w-full lg:max-w-xs 2xl:max-w-md  `}  >
              <div className="circle w-8 h-8 xl:w-24 xl:h-24  before:animate-pulse after:animate-pulse" />
              <h3 className="text-primary text-3xl" >
                {x.label}
              </h3>
              <p className={"text-center sm:text-left text-xs sm:text-sm xl:text-lg 2xl:text-xl font-serif my-3"} >
                {x.description}
              </p>
            </li>
          )
        })}
      </ul>
      <ImageAndText
        className={{
          section: "text-white font-orbitron bg-black shadow-2xl shadow-myblack w-11/12 xl:max-w-7xl rounded-md my-8 mx-auto flex flex-col md:flex-row-reverse ",
          figure: "overflow-hidden",
          image: "transition-all duration-1000 ease hover:scale-110 ",
          article: "lg:max-w-md items-center md:items-start justify-center flex flex-col py-4 md:px-16",
          h2: "text-center md:text-left uppercase text-2xl sm:text-3xl lg:text-4xl tracking-widest font-semibold text-myblue ",
        }}
      />

      <section className="xl:bg-fixed bg-no-repeat text-myblack w-full pt-96 md:py-16 my-8 mx-auto space-x-4"
        style={{ backgroundImage: `url('/raster/patient-focus.jpg')`, backgroundPosition: 'center center', backgroundSize: ' 100% 100%' }}
      >
        <article className=" bg-black md:bg-transparent py-4 md:py-8 lg:py-12 md:px-4 lg:px-8 h-1/4  items-center md:items-start justify-center flex flex-col " >
          <h2 className="text-center md:text-left uppercase lg:leading-snug font-orbitron md:font-bold text-2xl md:text-3xl lg:text-4xl tracking-widest font-semibold max-w-md lg:max-w-2xl md:bg-white md:bg-opacity-15 md:backdrop-blur-sm px-2 py-2 rounded-xl w-full" >
            {"Uninterupted Patient Focus"}
          </h2>
          <p className="my-3 text-center md:text-left text-lg lg:text-xl max-w-2xl md:bg-white md:bg-opacity-15 md:backdrop-blur-sm px-2 py-2 rounded-xl w-full" >
            {"Medical Billing Miami Beach understands the unique demands of different medical specialties. Our approach is highly adaptable, ensuring that we meet the specific needs of your practice, regardless of your medical field. From primary care to specialized areas such as cardiology, radiology, and more, our services are tailored to your specialties. We're committed to delivering customized solutions that align with the nature of your practice, ensuring your financial success in your chosen field of healthcare."}
          <div className=" text-primary relative uppercase h-9 w-36 text-center  px-4 mx-2 my-3 transition-all ease-in-out duration-500 border-2 border-primary hover:border-transparent hover:bg-myblack hover:text-myblue btn-1 rounded-md hover:rounded-sm">
            <Link href={'#expertise'} className=" text-sm font-semibold tracking-wider ">
              Try Now
            </Link>
            <svg id="rect" >
              <rect x="0" y="0" className=" stroke-myblue" fill="none" width="100%" height="100%" />
            </svg>
          </div>
          </p>
          
        </article>
      </section>




      <div className="main-card1">
        <div className='right_section_card_one'>
          <div className="card1">
            <img src={'Vector2'} alt="Medical Coding" />
            <h3>Medical Coding</h3>
            <p>
              Identify opportunities for process improvement in order to
              maintain a current, comprehensive and compliant CDM
            </p>
          </div>
        </div>
        <div className='right_section_card_two'>
          <div className="card1 card2">
            <img src={'Vector3'} alt="Full-Medical Billing" />
            <h3>Full-Medical Billing</h3>
            <p>To provide maximum reimburesement for our clients</p>
          </div>
        </div>
      </div>

      <div className='mt-5 mb-3 contact-container'>
        <div className='contact-email-cotainer'>
          <img src={'envelope'} height='16px' width='19px' />
          <h3 className='btn' onClick={() => window.location.href = `mailto:Jasmel@medicalbillingmb.com`} style={{ fontSize: '18px' }} type='email'>
            Jasmel@medicalbillingmb.com
          </h3>
        </div>
        <div className='contact-email-cotainer'>
          <img src={'phone'} height='19px' width='19px' />
          <h3 className='btn' onClick={() => window.open('tel://+1-786-643-2099', "_blank")} type="tel" style={{ fontSize: '24px' }} >+1-786-643-2099</h3>

        </div>
      </div>

    </main>
  );
}

export const ImageAndText = (props) => {
  const { className, } = props;
  return (
    <section className={className.section} >
      <figure className={className.figure} >
        <Image
          src={`/raster/time-save.jpg`}
          alt={`save time`}
          width={1024}
          height={1024}
          className={className.image}
        />
      </figure>
      <article className={className.article} >
        <h2 className={className.h2}>
          {"Accounts Receivables"}
        </h2>
        <p className={className.p} >
          Our expert team of Billing Consultants and Coding Assistants can help! We specialize in healthcare revenue management and will work tirelessly to resolve your outstanding accounts receivables. With our proven approach, we only get paid when you do, and our objective is to maintain account receivable according to MGMA standards. Let us take care of your revenue management, so you can focus on providing top-quality patient care.
        </p>
        <div className=" text-myblue relative text-center uppercase h-9 w-36 py-1 px-4 mx-4 my-6 transition-all ease-in-out duration-500 border-2 border-myblue hover:border-transparent hover:bg-white hover:text-primary btn-1 rounded-md hover:rounded-sm">
          <Link href={'#expertise'} className=" text-sm font-semibold tracking-wider ">
            Try Now
          </Link>
          <svg id="rect" >
            <rect x="0" y="0" className=" stroke-primary" fill="none" width="100%" height="100%" />
          </svg>
        </div>
      </article>
    </section>
  )
}