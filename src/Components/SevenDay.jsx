import React from 'react'
import { TbAccessPoint } from "react-icons/tb";

const SevenDay = ({date,icon,weather,Maxtemp, Mintemp, color, isToday}) => {
    return (
        <div className='w-full sm:w-[75%] lg:w-full text-white flex items-center justify-between p-2 border-gray-700 rounded-xl bg-[#0E1622] ' >
            <p className='flex text-lg font-semibold '>{new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
            }) ?? "--"} {isToday && <span className=' text-yellow-300 ' ><TbAccessPoint  /></span>} </p>
            <div className=' flex items-center gap-1' >
                <p className={` text-xl ${color} `} >{icon ?? "--"}</p>
                <p className=' text-gray-300 text-sm ' >{weather ?? "--"}</p>
            </div>
            <p className=' text-lg font-semibold ' >{Maxtemp ?? "--"}&deg;/{Mintemp ?? "--"}&deg;</p>
        </div>
    )
}

export default SevenDay