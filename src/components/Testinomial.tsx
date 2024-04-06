import React from 'react'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import patientIcon from "../assets/avatar-icon.png"
import { HiStar } from "react-icons/hi"
 
const Testimonial = () => {
    return (
        <div className='mt-[30px] lg:mt-[55px]'>
            <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                }}
            >
                <SwiperSlide>
                    <div className='py-[30px] px-5 rounded-3'>
                        <div className='flex items-center gap-[13px]'>
                            <img src={patientIcon} alt="" />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor '>Rajat Sharma</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                   
                                </div>
                            </div>
                        </div>
 
                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                        "I've been using this expense app for a while now, and it's been incredibly helpful in managing my finances. It's user-friendly and provides the best features for tracking expenses."
                        </p>
                    </div>
                </SwiperSlide>
 
 
                <SwiperSlide>
                    <div className='py-[30px] px-5 rounded-3'>
                        <div className='flex items-center gap-[13px]'>
                            <img src={patientIcon} alt="" />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor '>Rajat Sharma</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                </div>
                            </div>
                        </div>
 
                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                        "Using this expense app has been a game-changer for me. It's so intuitive and well-designed, making it easy to input and monitor my expenses. Truly the best in its category!"
                        </p>
                    </div>
                </SwiperSlide>
 
 
 
 
                <SwiperSlide>
                    <div className='py-[30px] px-5 rounded-3'>
                        <div className='flex items-center gap-[13px]'>
                            <img src={patientIcon} alt="" />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor '>Rajat Sharma</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    
                                </div>
                            </div>
                        </div>
 
                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                        "I've tried a few expense apps, but this one stands out for its excellent service. It helps me stay on top of my spending effortlessly. Truly the best choice for managing expenses!"
                        </p>
                    </div>
                </SwiperSlide>
 
 
                <SwiperSlide>
                    <div className='py-[30px] px-5 rounded-3'>
                        <div className='flex items-center gap-[13px]'>
                            <img src={patientIcon} alt="" />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor '>Rajat Sharma</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                </div>
                            </div>
                        </div>
 
                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                        "Managing expenses used to be a hassle, but ever since I started using this app, it's become a breeze. The interface is clean, the features are top-notch, and overall, it offers the best experience for tracking expenses."
                        </p>
                    </div>
                </SwiperSlide>
 
 
 
 
                <SwiperSlide>
                    <div className='py-[30px] px-5 rounded-3'>
                        <div className='flex items-center gap-[13px]'>
                            <img src={patientIcon} alt="" />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor '>Rajat Sharma</h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    <HiStar className="text-yellowColor w-[18px] h-5" />
                                    
                                </div>
                            </div>
                        </div>
 
                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                        "I can't imagine managing my finances without this expense app. It's reliable, efficient, and provides the best tools for keeping track of my spending. Highly recommended!"
                        </p>
                    </div>
                </SwiperSlide>
 
            </Swiper>
        </div>
    )
}
 
export default Testimonial