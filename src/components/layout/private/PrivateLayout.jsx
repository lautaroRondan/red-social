import React, { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Header } from './Header'
import { SideBar } from './SideBar'

export const PrivateLayout = () => {

    const { auth, loading } = useAuth();
    let userId = localStorage.getItem("user")

    if (loading) {
        <h1>Cargando...</h1>
    } else {

        return (
            <>
                <Header />

                <section className="layout__content">

                    {
                        auth._id ?
                            <Outlet />
                            :
                            <Navigate to='/login' />}

                </section>

                <SideBar />
            </>
        );
    };
}

