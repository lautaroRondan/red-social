import React from 'react'
import useAuth from '../../hooks/useAuth';
import { PetitionFetchToken } from '../../helpers/PetitionFetch';
import { Global, Avatar } from '../../helpers/Global';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

export const UserList = ({ users, getUser, following, setFollowing, page, setPage, more }) => {

    const { auth, setCounters } = useAuth();

    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const userObj = JSON.parse(user);
    const idUser = userObj.id;

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getUser(next);
    }

    const follow = async (userId) => {
        const id = {
            followed: userId
        };

        const { datos } = await PetitionFetchToken(Global.url + "follow/save", "POST", token, id);

        if (datos.status === "success") {
            setFollowing([...following, userId])
        }

        const dato = await PetitionFetchToken(Global.url + "user/counters/" + idUser, "GET", token);
        setCounters(dato.datos);
    }

    const unfollow = async (userId) => {

        const { datos } = await PetitionFetchToken(Global.url + "follow/unfollow/" + userId, "DELETE", token);

        if (datos.status === "success") {
            let filtrar = following.filter(followingUserId => userId !== followingUserId);
            setFollowing(filtrar);
        }

        const dato = await PetitionFetchToken(Global.url + "user/counters/" + idUser, "GET", token);
        setCounters(dato.datos);

    }



    return (
        <>
            <div className="content__posts">

                {users.map(user => {
                    return (
                        <article className="posts__post" key={user._id}>

                            <div className="post__container">

                                <div className="post__image-user">
                                    <Link to={"/social/perfil/" + user._id} className="post__image-link">
                                        {!user.image ?
                                            <img src={Avatar.image} className="post__user-image" alt="Foto de perfil" />
                                            :
                                            <img src={user.image} className="post__user-image" alt="Foto de perfil" />
                                        }
                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <Link to={"/social/perfil/" + user._id} className="user-info__name">{user.name} {user.surname}</Link>
                                        <span className="user-info__divider"> | </span>
                                        <Link to={"/social/perfil/" + user._id} className="user-info__create-date"><ReactTimeAgo date={user.create_at} locale="es-AR" /></Link>
                                    </div>

                                    <h4 className="post__content">{user.bio}</h4>

                                </div>

                            </div>

                            {user._id != auth._id &&
                                <div className="post__buttons">

                                    {!following.includes(user._id) &&
                                        <button className="post__button post__button--green"
                                            onClick={() => follow(user._id)}>
                                            Seguir
                                        </button>
                                    }
                                    {following.includes(user._id) &&
                                        <button className="post__button"
                                            onClick={() => unfollow(user._id)}>
                                            Dejar de seguir
                                        </button>
                                    }

                                </div>
                            }
                        </article>

                    )

                })}

            </div>
            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas personas
                    </button>
                </div>
            }

        </>
    )
}


