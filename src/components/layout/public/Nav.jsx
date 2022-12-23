import React, { useState } from "react";
import avatar from "../../../assets/img/user.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import LRwhite from '/LRwhite.svg';

export const Nav = () => {

    const [isOpen, setIsOpen ] = useState(false)

    return (
        // <nav className="navbar__container-lists">
        //     <ul className="container-lists__menu-list">
        //         <li className="menu-list__item">
        //             <NavLink to="/login" className="menu-list__link">
        //                 <FontAwesomeIcon icon={faUser} />
        //                 <span className="menu-list__title">Login</span>
        //             </NavLink>
        //         </li>

        //         <li className="menu-list__item">
        //             <NavLink to="/registro" className="menu-list__link">
        //                 <FontAwesomeIcon icon={faUsers} />
        //                 <span className="menu-list__title">Registro</span>
        //             </NavLink>
        //         </li>
        //     </ul>
        // </nav>

        <nav className='navbar'>
                <div className='nav_logo'>
                <NavLink to="/social" className="navbar__title"><img src={LRwhite}/></NavLink>
                     </div>
                <div className={`nav_items ${isOpen && "open"}`}>
                <NavLink to="/login" className="menu-list__link">
                        <FontAwesomeIcon icon={faUser} />
                         <span className="menu-list__title">Login</span>
                    </NavLink>
                    <NavLink to="/registro" className="menu-list__link">
                        <FontAwesomeIcon icon={faUsers} />
                        <span className="menu-list__title">Registro</span>
                    </NavLink>
                   
                </div>
                <div className={`nav_toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            {/* </div> */}
            </nav>
    );
};
