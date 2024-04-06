import React from 'react'

type Props = {
    data : number,
    title : string,
    textColor : string
}

const LimitCard = ({data , title , textColor}: Props) => {
  return (
    <div className='w-full sm:w-72 h-36 border border-solid flex items-center justify-center shadow-panelShadow'>
    <div className='text-center'>
        <h1 className={`text-2xl font-bold ${textColor}`}> ₹ {data ? data : 0}</h1>
        <h3>{title}</h3>
    </div>
</div>
  )
}

export default LimitCard