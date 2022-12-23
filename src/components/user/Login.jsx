import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import { PetitionFetch } from '../../helpers/PetitionFetch';
import useAuth from '../../hooks/useAuth';

export const Login = () => {

  const { form, change } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const { setAuth } = useAuth();


  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    const { datos } = await PetitionFetch(Global.url + "user/login", "POST", userToLogin);
    if (datos.status === "success") {
      localStorage.setItem("token", datos.token);
      localStorage.setItem("user", JSON.stringify(datos.user));
      setSaved("login");

      setAuth(datos.user);
      setTimeout(() => {
        window.location.reload();
      }, 1000)

    } else {
      setSaved("error");
    }

  }

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__posts public">
        {saved == "login" ?
          <strong className='alert-login alert-success'> "Ingreso correctamente" </strong>
          : ""}
        {saved == "error" ?
          <strong className='alert-login alert-danger'> "Los datos proporcionasdos son incorrectos" </strong>
          : ""}
      </div>
      <div className="content__posts public">

        <form className='form-login' onSubmit={loginUser}>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={change} />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Contraseña</label>
            <input type='password' name='password' onChange={change} />
          </div>

          <input type='submit' value='Identificate' className='btn btn-success' />

        </form>
      </div>

    </>
  )
}

