import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { GetProfile } from '../../helpers/GetProfile';
import { useParams, Link } from 'react-router-dom';
import { PetitionFetchToken } from '../../helpers/PetitionFetch';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import { PublicationList } from '../publication/PublicationList';

export const Feed = () => {

    const { auth } = useAuth();
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [publications, setPublications] = useState([]);
    const params = useParams();

    useEffect(() => {
        getPublication(1, false);
    }, []);

    const getPublication = async (nextPage = 1, showNews = false) => {

        if (showNews) {
            setPublications([]);
            setPage(1);
            nextPage = 1;
        }

        const { datos } = await PetitionFetchToken(Global.url + "publication/feed/" + nextPage, "GET", localStorage.getItem("token"));

        if (datos.status === "success") {
            let newPublication = datos.publications;
            if (!showNews && publications.length >= 1) {
                newPublication = [...publications, ...datos.publications];
            }

            setPublications(newPublication);

            if (!showNews && publications.length >= (datos.total - datos.publications.length)) {
                setMore(false);
            }

            // if(datos.page <= 1){
            //     setMore(false)
            // }
        }
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button" onClick={() => getPublication(1, true)}>Mostrar nuevas</button>
            </header>

            <PublicationList publications={publications} getPublication={getPublication}
                page={page} setPage={setPage}
                more={more} setMore={setMore} />
        </>
    )
}

