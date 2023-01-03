import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import { PetitionFetch } from '../../helpers/PetitionFetch'
import { Navigate } from 'react-router-dom'

export const Register = () => {

    const { form, change } = useForm({});
    const [saved, setSaved] = useState("not_sended");

    const saveUser = async (e) => {
        e.preventDefault();
        let newUser = form;

        const { datos } = await PetitionFetch(Global.url + "user/register", "POST", newUser);
        if (datos.status === "success") {
            setSaved("guardado");
        } else {
            if (datos.message == "el usuario ya existe") {
                setSaved('existe')

            } else {
                setSaved("error");
            }

        }

    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Registro</h1>
            </header>
            <div>
                <div className="content__posts public">
                    {saved == "guardado" ?
                        <strong className='alert-register alert-success'> "Se registro correctamente" </strong>
                        : ""}
                    {saved == "error" ?
                        <strong className='alert-register alert-danger'>  "Los datos proporcionasdos son incorrectos" </strong>
                        : ""}
                    {saved == "existe" ?
                        <strong className='alert-register alert-danger'>  "El usuario ya existe" </strong>
                        : ""}
                </div>

                <div className="content__posts public">

                    <form className='register-form' onSubmit={saveUser}>

                        <div className='form-group'>
                            <label htmlFor='name'>Nombre</label>
                            <input type="text" name="name" onChange={change} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='surname'>Apellido</label>
                            <input type="text" name="surname" onChange={change} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='nick'>Nick</label>
                            <input type="text" name="nick" onChange={change} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Correo Electronico</label>
                            <input type="email" name="email" onChange={change} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Contraseña</label>
                            <input type="password" name="password" onChange={change} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='bio'>Bio</label>
                            <textarea name="bio" onChange={change} />
                        </div>

                        <input type="submit" value="Registrarse" className="btn btn-success" />

                    </form>
                </div>
            </div>
        </>
    )
}

