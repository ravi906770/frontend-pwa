import React from 'react'
import error from "../assets/error.avif"
import bg from "../assets/hero-bg.png"
import { Link } from 'react-router-dom'

type Props = {}

const ErrorPage = (props: Props) => {
  return (
    <>
    <section className=" flex items-center bg-no-repeat bg-center bg-cover py-[20px] 2xl:h-[800px]" >
        <div className="max-w-full w-[1440px] px-5 mx-auto">
        <div className="lg:w-[500px] mx-auto">
  <h2 className="text-3xl leading-9 font-bold text-headingColor text-center">Something went Wrong!!</h2>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center ml-48 mt-4">
    <Link to="/login" className="">Login</Link>
  </button>
</div>

          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-center">

            {/* ================== Hero Content ================== */}
            <img src={error} alt="" className='rounded-full w-1/2 sm:h-[600px]' />
            {/* ================== Hero Content ================== */}
          </div>
        </div>
      </section>
    </>
  )
}

export default ErrorPage