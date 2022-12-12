import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Header } from './Header'
import { SideBar } from './SideBar'

export const PrivateLayout = () => {

    const {auth} = useAuth();

    return (
        <>
            <Header />

            <section className="layout__content">
                {auth ._id ?
                    <Outlet/>
                    : <Navigate to='/'/>
                }
            
            </section>

            <SideBar/>
        </>
    )
}

