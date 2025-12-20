import React from 'react'

const Hourly = ({time,icon,temp,iconcolor}) => {
    return (
        <div className=' max-w-25 gap-0.5 h-27.5 bg-[#0B131E] flex flex-col items-center justify-center rounded-2xl border-[0.2px] border-gray-800 ' >
            <p className=' text-gray-400 ' >{time.slice(0,5) ?? "--"}</p>
            <p className={`text-3xl ${iconcolor} `} >{icon}</p>
            <p className=' text-lg font-bold ' >{temp ?? "--"}&deg;C</p>
        </div>
    )
}

export default Hourly