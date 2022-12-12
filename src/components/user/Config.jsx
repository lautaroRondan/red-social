import React, { useState } from 'react'
import { serializeForm } from '../../hooks/serializeForm';
import useAuth from '../../hooks/useAuth';
import { PetitionFetchToken } from '../../helpers/petitionFetch';
import { Global } from '../../helpers/Global';


export const Config = () => {

  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not_sended");

  const updateUser = async (e) => {
    e.preventDefault();

    let newDataUser = serializeForm(e.target);
    const token = localStorage.getItem("token");

    const { datos } = await PetitionFetchToken(Global.url + "user/update", "PUT", token , newDataUser);

    if (datos.status === "success") {

      setAuth(datos.user)
      setSaved("guardado");
    } else {
      setSaved("error");
    }
  }

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Ajustes</h1>
      </header>

      <div className="content__posts">
        {saved == "guardado" ?
          <strong className='alert alert-success'> "Se actualizo correctamente" </strong>
          : ""}
        {saved == "error" ?
          <strong className='alert alert-danger'> "Los datos proporcionasdos son incorrectos" </strong>
          : ""}

        <form className='config-form' onSubmit={updateUser}>

          <div className='form-group'>
            <label htmlFor='name'>Nombre</label>
            <input type="text" name="name" defaultValue={auth.name} />
          </div>

          <div className='form-group'>
            <label htmlFor='surname'>Apellido</label>
            <input type="text" name="surname" defaultValue={auth.surname} />
          </div>

          <div className='form-group'>
            <label htmlFor='nick'>Nick</label>
            <input type="text" name="nick" defaultValue={auth.nick} />
          </div>

          <div className='form-group'>
            <label htmlFor='bio'>Bio</label>
            <textarea name="email" defaultValue={auth.bio} />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Correo Electronico</label>
            <input type="email" name="email" defaultValue={auth.email} />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Contraseña</label>
            <input type="password" name="password" />
          </div>

          <div className='form-group'>
            <label htmlFor='file0'>Avatar</label>
            <div className='avatar'>
              {/* mostrar imagen */}
            </div>
            <input type="file" name="file0" />
          </div>
          <br />
          <input type="submit" value="Actualizar" className="btn btn-success" />

        </form>

      </div>
    </>
  )
}


