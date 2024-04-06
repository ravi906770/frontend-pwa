import React, { useState } from 'react'
import heroImg01 from "../assets/hero-img05.avif"
// import heroImg02 from "../assets/hero-img02.png"
// import heroImg03 from "../assets/hero-img03.png"
import icon01 from "../assets/service01.avif"
import icon02 from "../assets/service03.avif"
import icon03 from "../assets/service04.avif"
import icon4 from "../assets/service02.avif"
import bg from "../assets/hero-bg.png"
import { Link } from "react-router-dom"
import { BsArrowRight } from "react-icons/bs"
import { useAuth } from '../context/authContext'
import Testimonial from '../components/Testinomial'
import FaqList from '../components/FAQ/FaqList'
import faqimg from "../assets/faq.jpg"



type Props = {}

const Homepage = (props: Props) => {

    const { auth } = useAuth();
    const [isVideoVisible, setIsVideoVisible] = useState<boolean>(false);

    

    const toggleVideoVisibility = (): void => {
        setIsVideoVisible(!isVideoVisible);
      };

    return (
        <>
            {/* ================== Hero Section ================== */}

            <section className=" flex items-center bg-no-repeat bg-center bg-cover py-[60px] 2xl:h-[800px]" style={{ backgroundImage: `url(${bg})` }}>
                <div className="max-w-full w-[1440px] px-5 mx-auto">
                    <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">

                        {/* ================== Hero Content ================== */}
                        <div>
                            <div className="lg:w-[570px]">
                                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">Track Your <span className='text-bold text-primaryColor'>Expense</span> Without Any Hassle
                                </h1>


                                <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px]">Simplify expense tracking with our intuitive platform. Easily record, categorize, and analyze spending habits to make informed financial decisions effortlessly.
                                </p>
                                {
                                    auth.access_token ? (
                                        <>
                                             <div className="video-container">
                                            <button  onClick={toggleVideoVisibility} className= "start-tutorial-button bg-primaryColor py-[15px] px-[35px] hover:bg-green-400 rounded-[50px] text-white font-[600] mt-[38px]">Start a Tutorial</button>
                                            {/* {isVideoVisible && (
                                                <div className="video-overlay">
                                                    <video controls autoPlay>
                                                        <source src={require("../assets/")} type="video/mp4"/>
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </div>
                                            )} */}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/register">
                                                <button className="bg-primaryColor py-[15px] px-[35px] hover:bg-green-400 rounded-[50px] text-white font-[600] mt-[38px]">Sign Up Free</button>
                                            </Link>
                                        </>
                                    )
                                }

                            </div>


                            {/* Hero Counter*/}
                            <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px] ">

                                <div>
                                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading=[54px] font-700 text-headingColor">3+</h2>
                                    <span className="w-[50px] h-2 bg-yellowColor rounded-full block ml-[-4px]"></span>
                                    <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px]">Experience</p>
                                </div>

                                <div>
                                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading=[54px] font-700 text-headingColor">15k+</h2>
                                    <span className="w-[90px] h-2 bg-purpleColor rounded-full block ml-[-4px]"></span>
                                    <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px]">Downloads</p>
                                </div>

                                <div>
                                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading=[54px] font-700 text-headingColor">100%</h2>
                                    <span className="w-[110px] h-2 bg-irisBlueColor rounded-full block ml-[-4px]"></span>
                                    <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px]">User Satisfaction</p>
                                </div>

                            </div>

                        </div>
                        {/* ================== Hero Content ================== */}
                        <div className="flex gap-[30px] justify-end">
                            <div>
                                <img className="w-full rounded-full" src={heroImg01} alt="" />
                            </div>
                            {/* <div className="mt-[30px]">
                <img className="w-full mb-[30px]" src={heroImg02} alt="" />
                <img className="w-full" src={heroImg03} alt="" />
              </div> */}
                        </div>

                    </div>
                </div>
            </section>


            {/* ================== About Section ================== */}

            <section className=" flex items-center bg-no-repeat bg-center bg-cover py-[60px] 2xl:h-[800px]">
                <div className="max-w-full w-[1440px] px-5 mx-auto">
                    <div className="lg:w-[500px] mx-auto">
                        <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor text-center">About us</h2>
                        <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px] text-center">Our Commitment to Simplifying Your Financial Journey.</p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">

                        {/* ================== Hero Content ================== */}
                        <img src={icon4} alt="" className='rounded-full' />
                        {/* ================== Hero Content ================== */}
                        <div className="flex gap-[30px] justify-end">
                            <p className='text-textColor text-[20px]'>
                                At <span className='text-primaryColor font-bold'>Zip money</span>, we're dedicated to simplifying your financial journey. Our platform is designed to empower individuals and businesses alike, providing intuitive tools for effective expense management. With a focus on transparency, security, and usability, we strive to offer a seamless experience for tracking, analyzing, and optimizing your expenses. Whether you're a freelancer striving for financial independence or a small business aiming for growth, our mission is to support you every step of the way. Trust in our commitment to innovation and reliability as we help you achieve greater financial clarity and control. Welcome to a smarter way to manage your finances.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ================== Hero Section End ================== */}
            <section className="py-[25px]">
                <div className="max-w-full w-[1440px] px-5 mx-auto">
                    <div className="lg:w-[500px] mx-auto">
                        <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor text-center">Our Best Services</h2>
                        <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px] text-center">Simplify expense tracking and gain insights with our essential services for effortless recording and analytics.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px0 lg:mt-[55px]">

                        <div className="py-[30px] px-5">
                            <div className="flex items-center justify-center">
                                <img src={icon01} alt="" className='content-fit' />
                            </div>
                            <div className="mt-[30px]">
                                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Expense reports</h2>
                                <p className="text-[16px] leading-7 font-[400] text-textColor mt-4  text-center">Generate detailed expense reports effortlessly with our streamlined service. Gain insights, track spending trends, and make informed decisions for financial management.</p>

                                <Link to="/" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="py-[30px] px-5">
                            <div className="flex items-center justify-center">
                                <img src={icon02} alt="" className='h-[317px]' />
                            </div>
                            <div className="mt-[30px]">
                                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Adding Manually Expense</h2>
                                <p className="text-[16px] leading-7 font-[400] text-textColor mt-4  text-center">Easily add expenses manually with our intuitive service. Input spending details seamlessly for accurate financial tracking and comprehensive expense management.</p>

                                <Link to="/" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                                </Link>
                            </div>
                        </div>


                        <div className="py-[30px] px-5">
                            <div className="flex items-center justify-center">
                                <img src={icon03} alt="" className='h-[317px]' />
                            </div>
                            <div className="mt-[30px]">
                                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Expense Visualization</h2>
                                <p className="text-[16px] leading-7 font-[400] text-textColor mt-4  text-center">Visualize your expenses with insightful charts and graphs. Our platform offers dynamic visualization tools for a clear overview of your spending habits and financial trends.</p>

                                <Link to="/" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* ================== Service section ================== */}

            <section className="py-[25px]">
                <div className="max-w-full w-[1440px] px-5 mx-auto">
                    <div className="lg:w-[500px] mx-auto">
                        <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor text-center">Our Features</h2>
                        <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px] text-center">Simplify expense tracking and gain insights with our essential services for effortless recording and analytics.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px0 lg:mt-[55px]">

                        <div className="py-[30px] px-5">
                            <div className="mt-[30px]">
                                <h2 className="text-[30px] leading-9 text-headingColor font-bold">Expense Tracking</h2>
                                <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">Effortlessly monitor your spending habits by recording all your expenses in one convenient location. With our intuitive interface, you can easily input, categorize, and manage your expenditures.</p>
                                <div className="flex justify-between">
                                    <div>
                                        <Link to="/services" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                                        </Link>
                                    </div>
                                    <div className="flex w-10 h-10 bg-purple-500 justify-center items-center mt-[30px] ">
                                        <h1 className="font-bold">1</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="py-[30px] px-5">
                            <div className="mt-[30px]">
                                <h2 className="text-[30px] leading-9 text-headingColor font-bold">Customizable Categories</h2>
                                <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">Tailor expense categories to suit your specific needs. Whether it's groceries, utilities, or entertainment, customize categories to accurately reflect your spending patterns.</p>
                                <div className="flex justify-between">
                                    <div>
                                        <Link to="/services" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                                        </Link>
                                    </div>
                                    <div className="flex w-10 h-10 bg-green-300 justify-center items-center mt-[30px] ">
                                        <h1 className="font-bold">2</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="py-[30px] px-5">
                            <div className="mt-[30px]">
                                <h2 className="text-[30px] leading-9 text-headingColor font-bold">Budget Management</h2>
                                <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">Set budgets and track your spending against them in real-time. Receive alerts when you're nearing your budget limits, helping you stay financially responsible.You can Manage it by Your Own.</p>
                                <div className="flex justify-between">
                                    <div>
                                        <Link to="/services" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                                        </Link>
                                    </div>
                                    <div className="flex w-10 h-10 bg-red-300 justify-center items-center mt-[30px] ">
                                        <h1 className="font-bold">3</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="py-[30px] px-5">
                            <div className="mt-[30px]">
                                <h2 className="text-[30px] leading-9 text-headingColor font-bold">Insightful Reports</h2>
                                <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">Gain valuable insights into your financial health with detailed reports and analytics. Visualize your spending patterns, identify trends, and make informed decisions to optimize your budget.</p>
                                <div className="flex justify-between">
                                    <div>
                                        <Link to="/services" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                                        </Link>
                                    </div>
                                    <div className="flex w-10 h-10 bg-yellow-300 justify-center items-center mt-[30px] ">
                                        <h1 className="font-bold">4</h1>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="py-[30px] px-5">
                            <div className="mt-[30px]">
                                <h2 className="text-[30px] leading-9 text-headingColor font-bold">Automated Tracking</h2>
                                <p className="text-[16px] leading-7 font-[400] text-textColor mt-4"> Integrate with bank accounts and credit cards for automatic expense tracking. Streamline the process and ensure no expense goes unnoticed.We integrate your bank account with our website for your easiness.</p>
                                <div className="flex justify-between">
                                    <div>
                                        <Link to="/services" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                                        </Link>
                                    </div>
                                    <div className="flex w-10 h-10 bg-blue-300 justify-center items-center mt-[30px] ">
                                        <h1 className="font-bold">5</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="py-[30px] px-5">
                            <div className="mt-[30px]">
                                <h2 className="text-[30px] leading-9 text-headingColor font-bold">Receipt Upload</h2>
                                <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">Simplify expense management by uploading digital receipts directly to the platform. Keep track of your purchases and maintain detailed records effortlessly.You can upload your receipt manually.</p>
                                <div className="flex justify-between">
                                    <div>
                                        <Link to="/services" className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                                            <BsArrowRight className="group-hover:text-white w-6 h-5" />
                                        </Link>
                                    </div>
                                    <div className="flex w-10 h-10 bg-pink-300 justify-center items-center mt-[30px] ">
                                        <h1 className="font-bold">6</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ================== faq section ================== */}

 <section>
        <div className="container max-w-full w-[1440px] px-5 mx-auto">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqimg} alt="" />
            </div>
 
          <div className="w-full md:w-1/2">
            <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor">Frequently asked questions</h2>
            <FaqList/>
          </div>
 
          </div>
        </div>
      </section>


             {/* ================== testinmonial section ================== */}


            <section>
      <div className="container max-w-full w-[1440px] px-5 mx-auto">
      <div className="lg:w-[500px] mx-auto mt-10">
          <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor text-center">What our Users say</h2>
          <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px] text-center">Our Commitment to Simplifying Your Financial Journey.</p>
      </div>
 
<Testimonial/>
 
        </div>
      </section>



 



            {/* ================== footer section ================== */}



        </>
    )
}

export default Homepage