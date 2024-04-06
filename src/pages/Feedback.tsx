import React from 'react'
import bg from "../assets/hero-bg.png"
import feed from "../assets/feedback.avif"
import { Link } from 'react-router-dom'

type Props = {}

const Feedback = (props: Props) => {
  return (
    <>
     <section className="flex items-center bg-no-repeat bg-center bg-cover 2xl:h-[800px]" style={{ backgroundImage: `url(${bg})` }}>
  <div className="max-w-full w-[1440px] px-5 mx-auto">
    <div className="lg:w-[500px] mx-auto">
      <h2 className="text-[44px] leading-[54px] font-[700] text-headingColor text-center">Feedback</h2>
      <p className="text-[18px] leading-[30px] font-[400] text-textColor mt-[18px] text-center">Our dedication to streamlining your financial path based on your feedback.</p>
    </div>
    <div className="flex flex-col lg:flex-row items-center justify-center gap-[90px] mt-8">
      {/* Image */}
      <img src={feed} alt="" className="rounded-full  lg:w-auto lg:h-auto" />
      {/* Form */}
      <div className="lg:max-w-lg">
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                Email
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="email" placeholder="Your email" />
            </div>
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-message">
                Message
              </label>
              <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-32 resize-none" id="grid-message" placeholder="Your message"></textarea>
            </div>
          </div>
          <div className="flex">
            <button className="bg-primaryColor hover:bg-primaryColorLight text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Feedback