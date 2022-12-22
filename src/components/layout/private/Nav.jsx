import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faGear, faHouse, faList, faUser } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../../hooks/useAuth';
import { Avatar } from '../../../helpers/Global';
import LRwhite from '/LRwhite.svg';

export const Nav = () => {

    const { auth } = useAuth();
    const [isOpen, setIsOpen ] = useState(false)

    return (
        <>
            {/* <nav className="navbar__container-lists">

                <ul className="container-lists__menu-list">
                    <li className="menu-list__item">
                        <NavLink to="/social/feed" className="menu-list__link">
                            <FontAwesomeIcon icon={faHouse} />
                            <span className="menu-list__title">Inicio</span>
                        </NavLink>
                    </li>

                   

                    <li className="menu-list__item">
                        <NavLink to="/social/gente" className="menu-list__link">
                            <FontAwesomeIcon icon={faUser} />
                            <span className="menu-list__title">Gente</span>
                        </NavLink>
                    </li>

                </ul>

                <ul className="container-lists__list-end">
                    <li className="list-end__item">
                        <NavLink to={"/social/perfil/" + auth._id} className="list-end__link-image">
                            {
                                !auth.image ?
                                    <img src={Avatar.image} className="list-end__img" alt="Imagen de perfil" />
                                    :
                                    <img src={auth.image} className="list-end__img" alt="Imagen de perfil" />
                            }

                        </NavLink>
                    </li>
                    <li className="list-end__item">
                        <NavLink to={"/social/perfil/" + auth._id} className="list-end__link">
                            <span className="list-end__name">{auth.nick}</span>
                        </NavLink>
                    </li>
                    <li className="list-end__item">
                        <NavLink to="/social/ajustes" className="list-end__link">
                            <FontAwesomeIcon icon={faGear} />
                            <span className="list-end__name">Ajustes</span>
                        </NavLink>
                    </li>
                    <li className="list-end__item">
                        <NavLink to="/social/logout" className="list-end__link">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            <span className="list-end__name">Cerrar sesión</span>
                        </NavLink>
                    </li>
                </ul>

            </nav> */}

            <nav className='navbar'>
                <div className='nav_logo'>
                <NavLink to="/social" className="navbar__title"><img src={LRwhite}/></NavLink>
                     </div>
                <div className={`nav_items ${isOpen && "open"}`}>
                    <NavLink to="/social/feed" className="menu-list__link">
                        <FontAwesomeIcon icon={faHouse} />
                        <span className="menu-list__title">Inicio</span>
                    </NavLink>
                    <NavLink to="/social/gente" className="menu-list__link">
                        <FontAwesomeIcon icon={faUser} />
                        <span className="menu-list__title">Gente</span>
                    </NavLink>
                    <NavLink to={"/social/perfil/" + auth._id} className="list-end__link">
                    <span className="list-end__name">Perfil</span>
                    </NavLink>
                    <NavLink to="/social/ajustes" className="list-end__link">
                        <FontAwesomeIcon icon={faGear} />
                        <span className="list-end__name">Ajustes</span>
                    </NavLink>
                    <NavLink to="/social/logout" className="list-end__link">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <span className="list-end__name">Cerrar sesión</span>
                    </NavLink>
                </div>
                <div className={`nav_toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            {/* </div> */}
            </nav>
        </>
    )
}

