import React from 'react';
import avatar from '../../../assets/img/user.png';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faGear, faHouse, faList, faUser } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../../hooks/useAuth';

export const Nav = () => {

    const {auth} = useAuth();

    return (
        <nav className="navbar__container-lists">

            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <NavLink to="/social/feed" className="menu-list__link">
                        <FontAwesomeIcon icon={faHouse} />
                        <span className="menu-list__title">Inicio</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                <NavLink to="/social/feed" className="menu-list__link">
                        <FontAwesomeIcon icon={faList} />
                        <span className="menu-list__title">Timeline</span>
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
                    <a href="#" className="list-end__link-image">
                        <img src={avatar} className="list-end__img" alt="Imagen de perfil" />
                    </a>
                </li>
                <li className="list-end__item">
                    <a href="#" className="list-end__link">
                        <span className="list-end__name">{auth.nick}</span>
                    </a>
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

        </nav>
    )
}

