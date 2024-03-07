import React from 'react';


const Navbar = () => {
    return (
        <div className='flex justify-between'>
            <h1 className='w-full text-3xl '>  
            <span style={{ color: '#33CA7F' }}>Bite</span>
                <span>By</span>
                <span style={{ color: '#264BCC' }}>Byte</span></h1>
            <ul className='flex'>
                <li className='p-4'>Home</li>
                <li className='p-4'>About</li>
            </ul>
        </div>
    )
}

export default Navbar;