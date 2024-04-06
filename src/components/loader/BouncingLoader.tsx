import React from "react";;

const BouncingLoader = () => {
  return (
    <>
      <div className="flex-col fixed top-0 left-0 w-full h-full flex justify-center  bg-opacity-50 items-center z-50">
        <div className="flex justify-center items-center">
          <div className="w-4 h-4 m-1 rounded-full bg-red-600 animate-bounce"></div>
          <div className="w-4 h-4 m-1 rounded-full bg-blue-800 animate-bounce delay-200"></div>
          <div className="w-4 h-4 m-1 rounded-full bg-green-800 animate-bounce delay-400"></div>
          <div className="w-4 h-4 m-1 rounded-full bg-purple-800 animate-bounce delay-600"></div>
          <div className="w-4 h-4 m-1 rounded-full bg-yellow-600 animate-bounce delay-800"></div>
          <div className="w-4 h-4 m-1 rounded-full bg-pink-600 animate-bounce delay-1000"></div>
        </div>
      </div>
    </>

  );
};

export default BouncingLoader;
