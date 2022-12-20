import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { GetProfile } from '../../helpers/GetProfile';
import { useParams, Link } from 'react-router-dom';
import { PetitionFetchToken } from '../../helpers/PetitionFetch';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import ReactTimeAgo from 'react-time-ago';


export const PublicationList = ({ publications, getPublication, page, setPage, more, setMore }) => {

    const { auth } = useAuth();

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublication(next)
    }

    const deletePublication = async (publicationId) => {

        const { datos } = await PetitionFetchToken(Global.url + "publication/remove/" + publicationId, "DELETE", localStorage.getItem("token"));

        setPage(1);
        setMore(true);
        getPublication(1, true);
    }


    return (
        <>
            <div className="content__posts">

                {publications.map(publication => {

                    return (

                        <article className="posts__post" key={publication._id}>

                            <div className="post__container">

                                <div className="post__image-user">
                                    <Link to={"/social/perfil/" + publication.user._id} className="post__image-link">
                                        <img src={publication.user.image} className="post__user-image" alt="Foto de perfil" />
                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <Link to={"/social/perfil/" + publication.user._id} className="user-info__name">{publication.user.name} {publication.user.surname}</Link>
                                        <span className="user-info__divider"> | </span>
                                        <Link to={"/social/perfil/" + publication.user._id} className="user-info__create-date"><ReactTimeAgo date={publication.crated_at} locale="es-AR" /> </Link>
                                    </div>

                                    <h4 className="post__content">{publication.text}</h4>
                                    <img src={publication.image} />

                                </div>

                            </div>

                            {auth._id == publication.user._id &&
                                <div className="post__buttons">

                                    <button onClick={() => deletePublication(publication._id)} className="post__button">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>

                                </div>
                            }
                        </article>
                    )
                })}

            </div>

            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}


