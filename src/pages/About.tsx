import React from 'react'
import { Link } from 'react-router-dom'
import bg from "../assets/hero-bg.png"
import heroImg01 from "../assets/about04.avif"
import play from "../assets/playstore.png"

type Props = {}

const About = (props: Props) => {

  return (
    <>
      <section className=" flex items-center bg-no-repeat bg-center bg-cover py-[20px] 2xl:h-[800px]" style={{ backgroundImage: `url(${bg})` }}>
        <div className="max-w-full w-[1440px] px-5 mx-auto">
          <div className="lg:w-[500px] mx-auto">
            <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor text-center">About us</h2>
            <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px] text-center">Our Commitment to Simplifying Your Financial Journey.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">

            {/* ================== Hero Content ================== */}
            <img src={heroImg01} alt="" className='rounded-full' />
            {/* ================== Hero Content ================== */}
            <div className="flex gap-[30px] justify-end">
              <p className='text-textColor text-[20px]'>
                At <span className='text-primaryColor font-bold'>Zip money</span>, we're dedicated to simplifying your financial journey. Our platform is designed to empower individuals and businesses alike, providing intuitive tools for effective expense management. With a focus on transparency, security, and usability, we strive to offer a seamless experience for tracking, analyzing, and optimizing your expenses. Whether you're a freelancer striving for financial independence or a small business aiming for growth, our mission is to support you every step of the way. Trust in our commitment to innovation and reliability as we help you achieve greater financial clarity and control. Welcome to a smarter way to manage your finances.</p>
            </div>
          </div>
          <div className="flex md:flex-col sm:flex-col justify-evenly mt-10">
            <div className='justify-evenly flex md:flex-col sm:flx-col '>
              <h1 className='text-textColor text-[20px] mt-5'>Access us seamlessly on both web and app platforms for convenient management wherever you are.</h1>
            </div><br />
            <div className='flex gap-[30px] justify-end'>
              <h1 className='mt-5 text-textColor text-[20px] underline cursor-pointer'>Google Play Store</h1>
              <Link to="/">
                <img src={play} alt="" className='w-[50px] h-[50px] mt-2 cursor-pointer' />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default About




{/* <section className=" flex items-center bg-no-repeat bg-center bg-cover py-[20px] 2xl:h-[800px]">
<div className="max-w-full w-[1440px] px-5 mx-auto">
<div className="lg:w-[500px] mx-auto">
        <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor text-center">Contact Us</h2>
        <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px] text-center">Our Commitment to Simplifying Your Financial Journey.</p>
    </div>
    <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">

      
        <img src={heroImg01} alt="" className='rounded-full'/>
     

        <div className="flex gap-[30px] justify-end">
          
        </div>

    </div>
</div>
</section> */}