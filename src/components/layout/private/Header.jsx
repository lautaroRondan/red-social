import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from './Nav';
import LRwhite from '/LRwhite.svg';


export const Header = () => {
  return (
    <header className="layout__navbar">

      {/* <div className="navbar__header">
        <NavLink to="/social" className="navbar__title"><img src={LRwhite}/></NavLink>
      </div> */}

      <Nav></Nav>

    </header>
  )
}


