import React, { useEffect, useState } from 'react'
import { PetitionFetchToken } from '../../helpers/PetitionFetch';
import { Global } from '../../helpers/Global';
import { UserList } from './UserList';

export const People = () => {

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [following, setFollowing] = useState([]);
  const [more, setMore] = useState(true);

  useEffect(() => {
    getUser(1);
  }, [])

  const getUser = async (nextPage = 1) => {

    const token = localStorage.getItem("token");

    const { datos } = await PetitionFetchToken(Global.url + "user/list/" + nextPage, "GET", token);

    if (datos.users && datos.status === "succes") {
      let newUser = datos.users

      if (newUser.length >= 1) {
        newUser = [...users, ...datos.users];

      }
      setUsers(newUser)
      setFollowing(datos.user_following)

      if (users.length >= (datos.total - datos.users.length)) {
        setMore(false);
      }

    }
  }



  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Personas</h1>
      </header>

      <UserList users={users} getUser={getUser} following={following} setFollowing={setFollowing}
        page={page} setPage={setPage} more={more} />


    </>
  )
}

