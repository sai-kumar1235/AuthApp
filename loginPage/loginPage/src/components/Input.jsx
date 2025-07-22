import React from 'react'

function Input({label,type="text",id,className="",...props}){
    return <div className=''>
        <label htmlFor={id} className="inline-block mb-1 pl-1">{label} </label>
        <input type={type} {...props} id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}` } />
    
    </div>
}

export default Input;