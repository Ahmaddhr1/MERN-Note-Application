import React from 'react'

const Header = ({h1,p,span}) => {
    return (
        <header className="mb-4 ">
            <p className="md:text-sm text-[14px] text-gray-500">{p}</p>
            <h1 className="text-2xl  border-b ">{h1} <span className="text-my-green">{span} !</span></h1>
        </header>
    )
}

export default Header