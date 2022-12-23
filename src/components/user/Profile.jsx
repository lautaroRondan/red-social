import React, { useEffect, useState } from 'react'
import { GetProfile } from '../../helpers/GetProfile';
import { useParams, Link } from 'react-router-dom';
import { PetitionFetchToken } from '../../helpers/PetitionFetch';
import { Global, Avatar } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import { PublicationList } from '../publication/PublicationList';

export const Profile = () => {

    const { auth, setCounters} = useAuth();
    const [page, setPage] = useState(1);
    const [user, setUser] = useState({});
    const [more, setMore] = useState(true);
    const [countersProfile, setCountersProfile] = useState({});
    const [iFollow, setIFollow] = useState(false);
    const [publications, setPublications] = useState([]);
    const params = useParams();

    useEffect(() => {
        getDataUser();
        getCounters();
        getPublication(1, true);
    }, []);

    useEffect(() => {
        getDataUser();
        getCounters();
        setMore(true);
        getPublication(1, true);
    }, [params]);

    const userStorage = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const userObj = JSON.parse(userStorage);
    const idUser = userObj.id;

    const getDataUser = async () => {
        let dataUser = await GetProfile(params.userId, setUser);
        if (dataUser.following && dataUser.following._id) setIFollow(true);
    }

    const getCounters = async () => {
        // const { datos } = await PetitionFetchToken(Global.url + "user/counters/" + params.userId, "GET", localStorage.getItem("token"));

        // if (datos.following) {
        //     setCounters(datos);
        // }
        const dato = await PetitionFetchToken(Global.url + "user/counters/" + params.userId, "GET", token);
        setCountersProfile(dato.datos);
        console.log(params.userId)
    }

    const follow = async (userId) => {
        const id = {
            followed: userId
        };

        const { datos } = await PetitionFetchToken(Global.url + "follow/save", "POST", token, id);

        if (datos.status === "success") {
            setIFollow(true)
        }

        const dato = await PetitionFetchToken(Global.url + "user/counters/" + idUser, "GET", token);
        setCounters(dato.datos);
        getCounters();
        
    }

    const unfollow = async (userId) => {

        const { datos } = await PetitionFetchToken(Global.url + "follow/unfollow/" + userId, "DELETE", token);

        if (datos.status === "success") {
            setIFollow(false)
        }

        const dato = await PetitionFetchToken(Global.url + "user/counters/" + idUser, "GET", token);
        setCounters(dato.datos);
        getCounters();

    }

    const getPublication = async (nextPage = 1, newProfile = false) => {
        const { datos } = await PetitionFetchToken(Global.url + "publication/user/" + params.userId + "/" + nextPage, "GET", token);

        if (datos.status === "success") {
            let newPublication = datos.publications;
            if (!newProfile && publications.length >= 1) {
                newPublication = [...publications, ...datos.publications];
            }

            if (newProfile) {
                newPublication = datos.publications;
                setMore(true);
                setPage(1)
            }

            setPublications(newPublication);

            if (newProfile && publications.length >= (datos.total - datos.publications.length)) {
                setMore(false);
            }
        }
    }


    return (
        <>
            <header className="aside__profile-info">

                <div className="profile-info__general-info profile">
                    <div className="general-info__container-avatar">
                        {!user.image ?
                            <img src={Avatar.image} className="container-avatar__img" alt="Foto de perfil" />
                            :
                            <img src={user.image} className="container-avatar__img" alt="Foto de perfil" />
                        }
                    </div>

                    <div className="general-info__container-names">
                        <div className="container-names__name">
                            <h1>{user.name} {user.surname}</h1>
                            {user._id != auth._id &&
                                (iFollow ?
                                    <button onClick={() => unfollow(user._id)} className="content__button content__button--rigth content__button--red">Dejar de seguir</button>
                                    :
                                    <button onClick={() => follow(user._id)} className="content__button content__button--rigth">Seguir</button>
                                )}
                        </div>

                        <h2 className="container-names__nickname">{user.nick}</h2>
                        <p>{user.bio}</p>

                    </div>
                </div>

                <div className="profile-info__stats profile">

                    <div className="stats__following">
                        <Link to={"/social/siguiendo/" + user._id} className="following__link">
                            <span className="following__title">Siguiendo</span>
                            <span className="following__number">{countersProfile.following >= 1 ? countersProfile.following : 0}</span>
                        </Link>
                    </div>
                    <div className="stats__following stats__following--medio">
                        <Link to={"/social/seguidores/" + user._id} className="following__link">
                            <span className="following__title">Seguidores</span>
                            <span className="following__number">{countersProfile.followed >= 1 ? countersProfile.followed : 0}</span>
                        </Link>
                    </div>


                    <div className="stats__following">
                        <Link to={"/social/perfil/" + user._id} className="following__link">
                            <span className="following__title">Publicaciones</span>
                            <span className="following__number">{countersProfile.publications >= 1 ? countersProfile.publications : 0}</span>
                        </Link>
                    </div>


                </div>
            </header>

            <PublicationList publications={publications} getPublication={getPublication} setCounter={setCounters}
                page={page} setPage={setPage} more={more} setMore={setMore} idUser={params.userId} />

        </>
    )
}


