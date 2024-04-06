import React from 'react'
import { Link } from 'react-router-dom'
// import bg from "../assets/hero-bg.png"
import heroImg01 from "../assets/contact01.avif"
import logo from "../assets/logo2.png"
import { SlSocialFacebook } from "react-icons/sl";
import { TiSocialYoutube } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { TbWorldCheck } from "react-icons/tb";


const ContactUs = () => {
    return (
        <section className="flex items-center bg-no-repeat bg-center bg-cover py-[20px] 2xl:h-[800px]">
            <div className="max-w-full w-[1440px] px-5 mx-auto">
                <div className="lg:w-[500px] mx-auto">
                    <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor text-center">Contact us</h2>
                    <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px] text-center">Our Commitment to Simplifying Your Financial Journey.</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                    <img src={heroImg01} alt="Hero" className="rounded-full" />
                    <div className="flex gap-[30px] justify-end">
                        <section className="bg-white-200 pt-8 pb-6 mt-100px">
                            <div className="container mx-auto">
                                <h1 className='text-[35px] font-600 underline font-sans text-textColor text-center lg:text-left'>Let's Connect with Us</h1>
                                <div className="mt-6 lg:mb-0 mb-20">
                                    <div className="flex items-center mb-4">
                                        <SiMinutemailer className="text-red-400 mr-3" />
                                        <span>zipmoney@gmail.com</span>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <MdOutlineWifiCalling3 className="text-blue-900 mr-3" />
                                        <span>1800 200 100</span>
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <TbWorldCheck className="text-white-900 mr-3" />
                                        <span>zip@money.com</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-center lg:justify-start">
                                    <img src={logo} alt="Logo" />
                                    <h5 className="text-500 mt-0 mb-2 text-textColor font-sans text-center lg:text-left">
                                        Find us on any of these platforms, we respond in 1-2 business days.
                                    </h5>
                                    <div className="flex gap-2">
                                        <SlSocialFacebook className="text-blue-900 hover:bg-blue-300 rounded-full p-2" />
                                        <TiSocialYoutube className="text-red-900 hover:bg-red-400 rounded-full p-2" />
                                        <SlSocialInstagram className="text-pink-900 hover:bg-pink-300 rounded-full p-2" />
                                        <FaWhatsapp className="text-green-900 hover:bg-green-300 rounded-full p-2" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
