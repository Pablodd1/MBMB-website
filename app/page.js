'use client'
import Image from "next/image";
import Link from "next/link";
import Subscribe from "./utils/subscribe";

const solutions = [
  {
    label: "Medical Billing",
    description: "Get optimal reimbursement with our comprehensive medical billing and credentialing services. Our team specializes in maximizing revenue through precise coding and efficient billing practices, ensuring seamless financial management for your practice.",
    href: ""
  },
  {
    label: "Medical Coding",
    description: "Our medical billing and coding specialists meticulously decode complex procedures and diagnoses to optimize your revenue cycle. By identifying and implementing strategic improvements, we maintain a compliant Charge Description Master (CDM) while maximizing your earning potential.",
    href: ""
  },
  {
    label: "Consultaion",
    description: "As leaders in healthcare revenue cycle management, we provide tailored solutions to meet the unique needs of your practice. Let us guide you through the ever-evolving landscape of medical billing and coding, ensuring efficiency, compliance, and financial success.",
    href: ""
  }
]
const benefits = [
  {
    label: "Accurate Coding Guarantee:",
    description: "Our expert team ensures precise coding for maximum reimbursement, minimizing errors and denials."
  },
  {
    label: "Efficient Revenue Management:",
    description: "Streamline your revenue cycle with our comprehensive services, optimizing cash flow and financial performance."
  },
  {
    label: "Timely Reminders: ",
    description: "Send polite balance reminder calls to patients after the statement cycle, helping them stay informed about their outstanding balances."
  }
]
const pair1 = {
  src: "/raster/Time-Saving-Medical-Billing-Solutions.webp",
  alt: "Time-Saving Medical Billing Solutions",
  h2: "Time-Saving Medical Billing Solutions",
  p: "Experience unparalleled efficiency with our time-saving medical billing solutions. Our advanced technology and streamlined processes minimize administrative burdens, allowing you to reclaim valuable time for patient care and practice growth. From automated coding to seamless claim submission and follow-up, our services are designed to optimize workflow and maximize productivity.",
  actions: {
    label: "Try Now",
    href: '#expertise'
  }
}
const pair2 = {
  src: "/raster/healthcare-revenue-cycle-management-companies.webp",
  alt: "healthcare-revenue-cycle-management-companies",
  h2: "Credentialing",
  ul: [
    "Attestation due for private insurers",
    "Demographic changes including address",
    "CAQH Enrollment and Maintenance",
    "Electronic Data Interchange (EDI)",
    "Electronic Remittance Advice (ERA)",
    "Electronic Funds Transfer (EFT)"
  ],
  actions: {
    label: "Get Detail",
    href: '#expertise'
  }
}
const joinUs = {
  src: "/raster/join-medical-billing-coding-miami-beach-today.webp",
  alt: "join-medical-billing-coding-miami-beach-today",
  h2: "Free Consultation",
  p: "Our solutions are designed to streamline and optimize the complex world of healthcare revenue management. We offer a comprehensive suite of services, all aimed at maximizing your reimbursement potential and ensuring the financial health of your practice. With a focus on precision, compliance, and efficiency, our Medical Billing services are second to none.",
  actions: {
    label: "Consult Now",
    href: '#expertise'
  }
}
const paragraphContent = [
  "In today's fast-paced healthcare environment, minimizing administrative tasks is essential for maximizing productivity and ensuring quality patient care.",
  "Our comprehensive suite of services is designed to streamline administrative processes for doctors and clinic administrators, freeing up valuable time and resources.",
  "By leveraging our expertise in medical billing, coding, and revenue management, you can eliminate the hassle of paperwork and administrative complexities. With our efficient solutions, you'll experience a significant reduction in administrative burden, allowing you to focus on providing the best possible healthcare experience for your patients."
];
const practices = {
  label: "Practices",
  description: "understands the unique demands of different medical specialties. Our approach is highly adaptable, ensuring that we meet the specific needs of your practice, regardless of your medical field. From primary care to specialized areas such as cardiology, radiology, and more, our services are tailored to your specialties. We're committed to delivering customized solutions that align with the nature of your practice, ensuring your financial success in your chosen field of healthcare.",
  ul: [
    'Primary care',
    'Family medicine',
    'Internal medicine',
    'Pediatrics',
    'OB/GYN',
    'General surgery',
    'Orthopedics',
    'Dermatology',
    'Psychiatry',
    'Cardiology',
    'Oncology',
    'Ophthalmology',
    'Radiology',
    'Urology',
    'Endocrinology',
    'Urgent care'
  ]
}
const links = [
  [{
    href: "/consultation",
    label: "Get Consultation"
  },
  {
    href: "/medical-coding",
    label: "Medical Coding"
  },
  {
    href: "/medical-billing",
    label: "Medical Billing"
  }],
  [
    {
      href: "/billing-details",
      label: "Billing Information Form"
    },
    {
      href: "/business-details ",
      label: "Business Deatil Form"
    },
    {
      href: "/agreement-sign-up",
      label: "Agreement Sign-up Form"
    }
  ]
]
const social = [
  {
    href: "https://api.whatsapp.com/send?phone=17866432099",
    icon: "whatsapp"
  },
  {
    href: "",
    icon: "linkedin"
  },
  {
    href: "https://www.instagram.com/Miamitesting123",
    icon: "instagram"
  }
]
const contact = [
  {
    href: "https://api.whatsapp.com/send?phone=17866432099",
    icon: "whatsapp-white",
    label: "WhatsApp"
  },
  {
    href: "mailto:Jasmel@medicalbillingmb.com",
    icon: "email",
    label: "Email"
  },
  {
    href: "tel://+1-786-643-2099",
    icon: "phone",
    label: "Phone"
  }
]
const coding = {
  label: "Medical Coding",
  description: "Ensure accurate coding for your practice with our team of certified Medical Billing and Coding Specialists, Billing Consultants, and Coding Specialists. Our team has expertise in all specialties and adheres to industry guidelines and standards to meet your medical coding needs. We offer medical coding outsourcing services and provide support for doctor credential services, hospital billing, dispute medical resolution services, and insurance billing consultancy. Trust us to optimize your revenue cycle management and ensure that you receive the reimbursement you deserve.",
  ul: [
    {
      label: "ICD Coding",
      icon: "medical-coding-icd"
    },
    {
      label: "CPT/HCPCS Coding",
      icon: "medical-coding-cpt-hcpcs"
    },
    {
      label: "Modifiers",
      icon: "medical-coding-modifiers"
    }

  ]
}
export default function Home() {
  return (
    <main className=" ">
      <section className="" >
        <Image
          className="absolute w-full h-fit max-h-screen -z-10"
          src={'/raster/Medical-Billing,Coding-and-Credentialling-Services-Miami,Florida-Specialist.webp'}
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
        <article className="w-5/6  md:max-w-7xl mx-auto px-6 md:px-14 py-12 rounded-2xl text-black bg-white bg-opacity-75 brightness-125 backdrop-blur-lg" >
          <header className="" >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 text-center  font-bold  underline  " >
              <strong className="mx-2 font-semibold" >
                Medical Billing
              </strong>
              {/* <br /> */}
              MB
              {/* Miami Beach */}
            </h1>
            <p className="font-semibold text-xs md:text-md lg:text-lg text-center my-2" >
              Maximize Revenue with Specialized Medical Billing Solutions in Miami
            </p>
          </header>
          <p className=" font-serif text-gray-900 mt-8 mb-3 text-sm md:text-lg lg:text-xl max-w-5xl mx-auto">
            <strong className="text-pink2" > At Medical Billing Miami Beach, </strong>
            Our dedicated team specializes in medical billing, coding, and revenue management, ensuring precise and compliant solutions tailored to your needs. Trust us to navigate the complexities and optimize your financial performance.
          </p>
          <div className="wrapper max-w-5xl mx-auto">
            <Link className="cta bg-pink2 text-white hover:bg-myblack text-sm lg:text-lg h-fit w-fit -skew-x-12 shadow-md shadow-primary" href="#">
              <span>Send Email</span>
              <span>
                <svg width="auto" height="23px" className="h-4 lg:h-6" viewBox="0 0 66 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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
        <ul className="lg:w-11/12 max-w-xs md:max-w-2xl lg:max-w-7xl grid md:grid-cols-3 gap-4 mx-auto my-12 lg:my-44" >
          {
            solutions.map((x, i) => {
              return (
                <li key={i} className=" min-h-fit pb-4 flex flex-col rounded-xl bg-myblack text-white overflow-hidden " >
                  <h2 className="text-lg lg:text-xl font-semibold py-2 lg:py-4 px-6 bg-pink2" >
                    {x.label}
                  </h2>
                  <p className="mt-2 mb-4 px-6 text-sm lg:text-md tracking-wider " >
                    {x.description}
                  </p>
                  <div className=" lg:justify-self-end bg-white text-primary relative text-xs lg:text-md h-7 lg:h-8 w-max py-1 px-4 mx-6 lg:mx-4 mt-auto transition-all ease-in-out duration-500 hover:bg-pink2 hover:text-white btn-1 rounded-md hover:rounded-sm">
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
      <section className="grid lg:grid-cols-2 gap-2 md:max-w-7xl mx-auto md:px-6  lg:my-12" >
        <figure className=" overflow-hidden lg:rounded-xl  mx-4 " >
          <Image
            className="object-cover hover:scale-105 hover:-rotate-2 transition-all ease-linear duration-500 h-fit md:max-h-96 w-auto xl:h-full xl:w-auto xl:max-h-full mx-auto max-w-full self-center"
            src={'/raster/Medical-Billing-and-Coding-Specialists.webp'}
            width={4024}
            height={2024}
            alt="d"
          />
        </figure>
        <article className="flex flex-col py-12 lg:py-0 px-2 w-11/12 max-w-md mx-auto" >
          <h2 className="text-2xl lg:text-3xl text-myblack my-4 xl:my-6 font-semibold leading-4 sm:leading-5 xl:leading-6 underline" >
            Experienced Staff
            <br />
            <span className="text-xs sm:text-lg xl:text-xl px-0 font-normal" >
              Medical Billing and Coding Specialists
            </span>
          </h2>
          <p className="text-sm xl:text-lg text-gray-700 max-w-3xl w-fit text-justify" >
            At our firm, we pride ourselves on being expert medical billing and coding specialists, dedicated to ensuring the financial success of your practice. With years of experience and a deep understanding of healthcare revenue cycle management, we offer unparalleled professionalism and expertise. Trust us to handle your medical billing and coding needs with precision and efficiency, allowing you to focus on providing excellent patient care.
          </p>
          <div className=" bg-white text-pink2 relative text-sm lg:text-md h-8 lg:h-9 w-max py-1 px-4 mx-4 my-6 transition-all ease-in-out duration-500 border-2 border-pink2 border-opacity-50 hover:bg-pink2 hover:text-white btn-1 rounded-md hover:rounded-sm">
            <Link href={'#expertise'} className=" text-sm font-semibold tracking-wider ">
              Explore Expertise
            </Link>
            <svg id="rect" >
              <rect x="0" y="0" fill="none" className=" stroke-white" width="100%" height="100%" />
            </svg>
          </div>
        </article>
      </section>
      <ul className="grid lg:grid-cols-3 w-full h-full bg-myblack py-12 lg:py-52  px-12" >
        {benefits.map((x, i) => {
          return (
            <li key={i} className={` lg:px-2 lg:py-2 w-full max-w-xs 2xl:max-w-md mx-auto `}  >
              <div className="circle w-8 h-8 xl:w-24 xl:h-24  before:animate-pulse after:animate-pulse" />
              <h3 className="text-mypink font-semibold text-2xl lg:text-3xl" >
                {x.label}
              </h3>
              <p className={"text-white sm:text-left text-xs sm:text-sm xl:text-lg 2xl:text-xl font-serif my-3"} >
                {x.description}
              </p>
            </li>
          )
        })}
      </ul>
      <ImageAndText
        content={pair1}
        className={{
          section: "text-white font-orbitron shadow-2xl shadow-myblack w-11/12 max-w-2xl lg:max-w-6xl rounded-md mt-16 mb-32 mx-auto flex flex-col lg:flex-row-reverse ",
          figure: "overflow-hidden flex ",
          image: " object-cover transition-all duration-1000 ease hover:scale-105  h-auto w-full lg:h-full lg:w-auto xl:max-h-full mx-auto max-w-full self-center ",
          article: "bg-black  lg:max-w-lg items-center md:items-start justify-center flex flex-col py-4 px-2 md:px-16 ",
          h2: "my-4 text-center md:text-left uppercase text-2xl sm:text-3xl lg:text-4xl tracking-widest font-semibold text-mypink ",
          p: "   text-gray-100 text-sm md:text-lg lg:leading-6 px-3  ",
          icon: "text-mypink border-mypink hover:border-transparent hover:bg-white hover:text-pink2",
          rect: "stroke-pink2"
        }}
      />

      <section className="background1 overflow-hidden lg:bg-fixed bg-no-repeat text-white w-full h-fit  md:py-16 my-8 mx-auto "
        >
        <Image
          className="lg:hidden w-full h-fit max-h-screen "
          src={'/raster/medical-billing-and-medical-coding-services-healthcare-revenue-management.webp'}
          width={4024}
          height={2024}
          alt="d"
        />
        <article className=" bg-myblack lg:bg-transparent py-4 md:py-8 lg:py-12 md:px-4 lg:px-8 h-1/4  items-center justify-center flex flex-col " >
          <h2 className="text-center md:text-left uppercase lg:leading-snug font-orbitron md:font-bold text-2xl md:text-3xl lg:text-4xl tracking-widest font-semibold max-w-2xl lg:bg-pink2 lg:bg-opacity-95   px-2 py-2 rounded-t-xl w-full shadow-xl shadow-myblack" >
            {"Reduce Administrative Burden"}
          </h2>

          <ul className="my-3 md:my-0 font-serif text-center md:text-left text-sm lg:text-lg max-w-2xl text-gray-100 lg:bg-myblack lg:bg-opacity-40 px-2 py-2 w-full lg:shadow-xl shadow-mypink">
            {paragraphContent.map((paragraph, index) => <li key={index} className="my-4" >{paragraph}</li>)}
          </ul>

          <footer className="lg:text-xl max-w-2xl  lg:bg-mypink lg:bg-opacity-45 px-2 py-2 rounded-b-xl w-fit mx-auto md:mx-0 md:w-full shadow-xl" >
            <div className=" text-white relative uppercase h-9 w-36 text-center  px-4 mx-4 my-4 transition-all ease-in-out duration-500 border-2 border-white hover:border-transparent hover:bg-white hover:text-pink2 btn-1 rounded-md hover:rounded-sm">
              <Link href={'#expertise'} className=" text-sm font-semibold tracking-wider ">
                Get it Today
              </Link>
              <svg id="rect" >
                <rect x="0" y="0" className=" stroke-pink2" fill="none" width="100%" height="100%" />
              </svg>
            </div>
          </footer>
        </article>
      </section>


      <ImageAndText
        content={pair2}
        className={{
          section: "text-myblack shadow-lg shadow-mypink w-11/12 xl:max-w-7xl rounded-md mt-16 mb-32 mx-auto flex flex-col lg:flex-row ",
          figure: "overflow-hidden",
          image: " object-cover transition-all duration-1000 ease hover:scale-105   h-full w-auto xl:max-h-full mx-auto max-w-full ",
          article: "lg:max-w-md items-center md:items-start justify-center flex flex-col py-4 md:px-16 ",
          h2: "text-center md:text-left uppercase text-2xl sm:text-3xl lg:text-4xl tracking-widest font-semibold text-pink2 ",
          p: "font-serif text-sm tracking-wider ",
          ul: "my-4 min-w-max ",
          li: "py-2 px-2 my-1 last:border-b border-t ",
          icon: "text-pink2 border-pink2 hover:border-transparent hover:bg-myblack hover:text-white",
          rect: "stroke-white"
        }}
      />
      <section className="max-w-7xl w-11/12 mx-auto my-8 md:my-32 py-24 " >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800  font-bold  underline  " >
          {practices.label}
        </h1>
        <p className=" font-serif text-gray-900 mt-8 mb-3 text-sm md:text-lg lg:text-xl max-w-5xl">
          <strong className="text-pink2" >Medical Billing Miami Beach </strong>
          {practices.description}
        </p>
        <ul className={"my-4 min-w-max w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 "} >
          {practices.ul.map((x, j) =>
            <li key={`${j}`} className={"py-2 px-2 my-1 border-b text-xs md:text-sm  "} >
              <Image
                src={`/svg/arrow.svg`}
                alt={'arrow'}
                width={20}
                height={14}
                className={'inline-block -rotate-45 mr-1 w-4 md:w-5'}
              />
              {x}
            </li>
          )}
        </ul>
        <div className="wrapper max-w-5xl ">
          <Link className=" font-sans cta bg-mygreen text-white hover:bg-myblack text-lg lg:text-xl h-fit w-max -skew-x-12 shadow-md shadow-pink2" href="#">
            <span>Consult Now</span>
            <span>
              <svg width="auto" height="23px" className="h-4 lg:h-6" viewBox="0 0 66 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                  <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                  <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                </g>
              </svg>
            </span>
          </Link>
        </div>
      </section>
      <section className="px-4 py-24 mt-4 md:mt-16 bg-myblack text-white " >
        <h1 className="max-w-7xl w-max mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-myblue font-bold  underline  " >
          {coding.label}
        </h1>
        <p className=" mx-auto  font-serif text-gray-200 mt-8 mb-3 text-sm md:text-lg lg:text-xl max-w-5xl">
          {/* <strong className="text-pink2" >Medical Billing Miami Beach </strong> */}
          {coding.description}
        </p>
        <ul className={"mx-auto my-12 min-w-max w-full max-w-5xl grid sm:grid-flow-col items-center justify-evenly gap-x-4 "} >
          {coding.ul.map((x, j) =>
            <li key={`${j}`} className={"py-2 px-2 my-1"} >
              <Image
                src={`/raster/${x.icon}.webp`}
                alt={'arrow'}
                width={60}
                height={14}
                className={'inline-block mr-3 w-8 md:w-12'}
              />
              {x.label}
            </li>
          )}
        </ul>
      </section>
      <section className=" overflow-hidden bg-fixed bg-no-repeat w-full h-fit min-h-96   mx-auto background2"
      >
      </section>


      <ImageAndText
        content={joinUs}
        className={{
          section: "text-myblack w-11/12 xl:max-w-7xl rounded-md mt-16 mb-32 mx-auto flex flex-col md:flex-row ",
          figure: "overflow-hidden",
          image: " object-cover transition-all duration-1000 ease h-full w-auto xl:max-h-full mx-auto max-w-full ",
          article: "md:max-w-sm lg:max-w-md items-center md:items-start justify-center flex flex-col py-4 ",
          h2: "my-4 text-center md:text-left uppercase text-2xl sm:text-3xl lg:text-4xl tracking-widest font-semibold text-pink2 ",
          p: "text-myblack text-sm md:text-lg lg:leading-6 px-3  ",
          ul: "my-4 min-w-max ",
          li: "py-2 px-2 my-1 last:border-b border-t ",
          icon: "text-white bg-black border-transparent hover:bg-black hover:text-white rounded-none",
          rect: "stroke-white"
        }}
      />
      <footer className="bg-pink2 text-white w-full mt-8 pt-8  " >
        <section className="flex flex-col lg:flex-row items-center  my-12 w-full " >
          <figure className="w-1/5 min-w-44  max-w-96 h-full " >
            <Image
              className="mx-auto w-56"
              src={'/mbmb-white.png'}
              width={250}
              height={180}
              alt="d"
            />
          </figure>
          <article className="px-2 my-8 mx-auto w-fit" >
            <h3 className="text-xl lg:text-3xl underline mb-4" >
              Useful Links
            </h3>
            <nav className="font-serif text-gray-200 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 w-max" >
              {
                links.map((x, i) => {
                  return (
                    <ul key={i} className=" grid grid-rows-3  max-w-fit my-2 mx-auto text-lg" >
                      {
                        x.map((y, j) => {
                          return (
                            <li key={j} className="my-1 px-2 rounded-sm hover:bg-myblack transition-all ease-linear duration-200 " >
                              <Link href={y.href} >
                                <Image
                                  className="inline-block mr-2 w-4 "
                                  src={`/svg/${i === 0 ? 'form' : 'protected-form'}.svg`}
                                  width={20}
                                  height={180}
                                  alt={`list bullet, Medical Billing Miami Beach`}
                                />
                                {y.label}
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  )
                })}
            </nav>
          </article>
          <nav className="mx-auto w-max " >
            <h3 className="text-xl lg:text-3xl underline mb-4" >
              Contact Us
            </h3>
            <ul className="grid grid-rows-3 max-w-fit my-2 px-4 mx-auto text-lg" >
              {
                contact.map((x, i) => {
                  return (
                    <li key={i} className="py-1 px-2 rounded-sm hover:bg-myblack transition-all ease-linear duration-200 " >
                      <Link href={x.href} >
                        <Image
                          className=" inline-flex mr-2 w-6 max-h-5"
                          src={`/svg/${x.icon}.svg`}
                          width={40}
                          height={180}
                          alt={`${x.icon} of MBMB, Medical Billing Miami Beach`}
                        />
                        {x.label}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </section>
        <article className="w-full bg-myblack pb-2 flex flex-col items-center" >
          <Subscribe />
          <ul className=" flex justify-evenly  h-full max-w-fit my-1 mx-auto" >
            {
              social.map((x, i) => {
                return (
                  <li key={i} className="w-10  mx-4 p-1 last:p-0 border-b-4 border-pink2 " >
                    <Link href={x.href} >
                      <Image
                        className="w-full "
                        src={`/svg/${x.icon}.svg`}
                        width={40}
                        height={180}
                        alt={`${x.icon} of MBMB, Medical Billing Miami Beach`}
                      />
                    </Link>
                  </li>
                )
              })
            }
          </ul>
          <Sign />
        </article>
      </footer>
    </main>
  );
}

export const ImageAndText = (props) => {
  const { className, content } = props;
  return (
    <section className={className.section} >
      <figure className={className.figure} >
        <Image
          src={content.src}
          alt={content.alt}
          width={1024}
          height={1024}
          className={className.image}
        />
      </figure>
      <article className={className.article} >
        <h2 className={className.h2}>
          {content.h2}
        </h2>
        {
          content.p
          && <p className={className.p} >
            {content.p}
          </p>
        }

        {
          content.ul
            ? <ul className={className.ul} >{content.ul.map((y, j) => <li key={`${j}`} className={className.li} ><Image
              src={'/svg/arrow.svg'}
              alt={'arrow'}
              width={20}
              height={14}
              className={'inline-block -rotate-45 mr-1'}
            />{y}</li>)}</ul>
            : null
        }
        <div className={`cursor-pointer relative text-center uppercase h-9 w-36 py-1 px-4 mx-4 my-6 transition-all ease-in-out duration-500 border-2  btn-1 rounded-md hover:rounded-sm ${className.icon}`}>
          <Link href={content.actions.label} className=" text-sm font-semibold tracking-wider ">
            {content.actions.label}
          </Link>
          <svg id="rect" >
            <rect x="0" y="0" className={className.rect} fill="none" width="100%" height="100%" />
          </svg>
        </div>
      </article>
    </section>
  )
}


function Sign() {

  return (
    <aside className=' px-2 py-1 lg:py-2 mt-8  lg:my-1 self-center lg:self-start bg-white bg-opacity-85 lg:rounded-r-full text-black flex items-center w-full lg:w-max font-sans font-semibold text-xs sm:text-sm ' >
      <Image src={'/svg/info.svg'} loading='lazy' width={16} height={20} alt='icon info' className='  mr-1 inline-flex' />
      Designed & Developed By
      <Link className='mx-1 font-sans tracking-wide font-semibold uppercase' href={'https://www.myababeel.com'} >
        <Image src={'https://www.myababeel.com/logo.svg'} loading='lazy' width={37} height={20} alt='logo MyAbabeel' className=' inline-flex' />
        My<strong className=' text-myababeel' >Ababeel</strong>
      </Link>
    </aside>
  )
}