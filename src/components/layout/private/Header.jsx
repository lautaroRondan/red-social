import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav } from './Nav'

export const Header = () => {
  return (
    <header className="layout__navbar">

      <div className="navbar__header">
        <NavLink to="/social" className="navbar__title">LRSOCIAL</NavLink>
      </div>

      <Nav></Nav>

    </header>
  )
}


