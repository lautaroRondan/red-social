import React, { useState } from 'react'
import { serializeForm } from '../../hooks/serializeForm';
import useAuth from '../../hooks/useAuth';
import { PetitionFetchToken } from '../../helpers/PetitionFetch';
import { Global, Avatar } from '../../helpers/Global';


export const Config = () => {

  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not_sended");
  const urlImg = "https://res.cloudinary.com/diop3sm01/image/upload/v1670818379/avatar/user_ax4fkd.png"

  const updateUser = async (e) => {
    e.preventDefault();

    let newDataUser = serializeForm(e.target);
    // const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    // const userObj = JSON.parse(user);
    // const idUser = userObj.id;

    const { datos } = await PetitionFetchToken(Global.url + "user/update", "PUT", token, newDataUser);

    if (datos.status === "success") {

      setAuth(datos.user)
      setSaved("guardado");
    } else {
      setSaved("error");
    }

    const fileInput = document.querySelector("#fileimg");
    if (datos.status == "success" && fileInput.files[0]) {

      const formData = new FormData();
      formData.append("image", fileInput.files[0]);

      const imageP = await PetitionFetchToken(Global.url + "user/upload/", "POST", token, formData);

      if (imageP.datos.status === "success") {
        setSaved("saved");

      } else {
        if(imageP.datos.messague === "imagen invalida"){
          setSaved("extencion")
        }else{
          setSaved("error");
        }

      }
    }
  }

  return (
    <>
      <header className="content__header content__header--config">
        <h1 className="content__title ">Ajustes</h1>
      </header>

      <div className="content__posts content__posts--config">
        <div>
          {saved == "guardado" ?
            <strong className='alert alert-success alert-setting'> "Se actualizo correctamente" </strong>
            : ""}
          {saved == "error" ?
            <strong className='alert alert-danger alert-setting'> "Los datos proporcionasdos son incorrectos" </strong>
            : ""}
            {saved == "extencion" ?
            <strong className='alert alert-danger alert-setting'> "Formato de la imagen invalida" </strong>
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
                <a href="#" className="post__image-link">
                  {!auth.image ?
                    <img src={Avatar.image} className="post__user-image" alt="Foto de perfil" />
                    :
                    <img src={auth.image} className="post__user-image" alt="Foto de perfil" />
                  }

                </a>
              </div>
              <input type="file" id="fileimg" name="file0" />
            </div>
            <br />
            <input type="submit" value="Actualizar" className="btn btn-success" />

          </form>
        </div>
      </div>
    </>
  )
}


