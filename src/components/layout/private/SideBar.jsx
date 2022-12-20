import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Link, NavLink } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { PetitionFetchToken } from '../../../helpers/PetitionFetch';
import { Global, Avatar } from '../../../helpers/Global';

export const SideBar = () => {

    const { auth, counters } = useAuth();
    const { form, change } = useForm({});
    const [saved, setSaved] = useState("not saved")

    const savePublication = async (e) => {
        e.preventDefault();

        let newPublication = form;
        newPublication.user = auth._id

        const { datos } = await PetitionFetchToken(Global.url + "publication/save", "POST", localStorage.getItem("token"), newPublication);

        if (datos.status === "success") {
            setSaved("saved");

        } else {
            setSaved("error");
        }

        const fileInput = document.querySelector("#file");

        if (datos.status == "success" && fileInput.files[0]) {

            const formData = new FormData();
            formData.append("image", fileInput.files[0]);

            const imageP = await PetitionFetchToken(Global.url + "publication/upload/" + datos.publication._id, "POST", localStorage.getItem("token"), formData, true);

            if (imageP.datos.status === "success") {
                setSaved("saved");

            } else {
                setSaved("error");
            }
        }

        const myForm = document.querySelector("#publication-form");
        myForm.reset();

    }

    return (
        <aside className="layout__aside">

            <header className="aside__header">
                <h1 className="aside__title">Hola, {auth.name}</h1>
            </header>

            <div className="aside__container">

                <div className="aside__profile-info">

                    <div className="profile-info__general-info">
                        <div className="general-info__container-avatar">
                            {
                                !auth.image ?
                                <img src={Avatar.image} className="container-avatar__img" alt="Foto de perfil" />
                                :
                                <img src={auth.image} className="container-avatar__img" alt="Foto de perfil" />
                            }
                            
                        </div>

                        <div className="general-info__container-names">
                            <NavLink to={"/social/perfil/" + auth._id} className="container-names__name">{auth.name} {auth.surname} </NavLink>
                            <p className="container-names__nickname">{auth.nick}</p>
                        </div>
                    </div>

                    <div className="profile-info__stats">

                        <div className="stats__following">
                            <Link to={"/social/siguiendo/" + auth._id} className="following__link">
                                <span className="following__title">Siguiendo</span>
                                <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
                            </Link>
                        </div>
                        <div className="stats__following stats__following--medio">
                            <Link to={"/social/seguidores/" + auth._id} className="following__link">
                                <span className="following__title">Seguidores</span>
                                <span className="following__number">{counters.followed >= 1 ? counters.followed : 0}</span>
                            </Link>
                        </div>


                        <div className="stats__following">
                            <NavLink to={"/social/perfil/" + auth._id} className="following__link">
                                <span className="following__title">Publicaciones</span>
                                <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
                            </NavLink>
                        </div>


                    </div>
                </div>


                <div className="aside__container-form">

                    {saved == "saved" ?
                        <strong className='alert alert-p alert-success'> Publicada correctamente </strong>
                        : ""}
                    {saved == "error" ?
                        <strong className='alert alert-p alert-danger'> No se ha podido hacer la publicacion </strong>
                        : ""}

                    <form id='publication-form' className="container-form__form-post" onSubmit={savePublication}>

                        <div className="form-post__inputs">
                            <label htmlFor="text" className="form-post__label">¿Que estas pesando hoy?</label>
                            <textarea name="text" className="form-post__textarea" onChange={change} />
                        </div>

                        <div className="form-post__inputs">
                            <label htmlFor="file" className="form-post__label">Sube tu foto</label>
                            <input type="file" name="image" id="file" className="form-post__image" />
                        </div>

                        <input type="submit" value="Enviar" className="form-post__btn-submit" />

                    </form>

                </div>

            </div>

        </aside>
    )
}

