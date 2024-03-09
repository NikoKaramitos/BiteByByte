import React from 'react';


const Navbar = () => {
    return (
        <div className='flex justify-between text-blue'>
            <h1 className='w-full text-3xl font-bold'>React</h1>
            <ul className='flex'>
                <li className='p-4'>Home</li>
                <li className='p-4'>About</li>
            </ul>
        </div>
    )
}

export default Navbar