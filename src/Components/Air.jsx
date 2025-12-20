import React from 'react'

const Air = ({name,value,icon}) => {
    return (
        <div className=' max-w-42 min-h-22 flex gap-1 flex-col pl-2.5 items-start justify-center bg-[#0B131E] rounded-2xl border-[0.2px] border-gray-800 ' >
            <div className=' flex text-gray-400 gap-2 items-center' >
                {icon}
                <p className=' text-[14px] ' >{name ?? "--"}</p>
            </div>
            <p className=' text-2xl font-bold ' >{value ?? "--"}</p>
        </div>
    )
}

export default Air;