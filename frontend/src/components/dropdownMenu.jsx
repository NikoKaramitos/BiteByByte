import React, { useState } from 'react';

const MyDropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                Click me for options
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <a href="#action1" className="dropdown-item">Action 1</a>
                    <a href="#action2" className="dropdown-item">Action 2</a>
                    <a href="#action3" className="dropdown-item">Action 3</a>
                    <div className="dropdown-divider"></div>
                    <a href="#action4" className="dropdown-item">Separated link</a>
                </div>
            )}
        </div>
    );
};

export default MyDropdownMenu;
