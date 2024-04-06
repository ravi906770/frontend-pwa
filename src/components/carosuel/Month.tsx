import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props {
    transactionData: { month: string; payment: number }[],
    fetch: () => void
}

const Month: React.FC<Props> = ({ transactionData, fetch }) => {



    useEffect(() => {
        fetch();
    }, [])

    return (
        <div className="w-full z-0">
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={true}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 4,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {transactionData?.map((monthData, index) => {
                    // Convert month number to month name
                    const monthNames = [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    const monthName = monthNames[parseInt(monthData.month) - 1];

                    return (
                        <button key={index} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md">
                            <h2 className="text-lg font-bold mb-2">{monthName}</h2>
                            <p className="text-gray-700">{`Total Expense: ${monthData?.payment}`}</p>
                        </button>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default Month;
