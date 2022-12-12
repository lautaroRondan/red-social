import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { PetitionFetchToken } from '../../helpers/PetitionFetch';
import { Global } from '../../helpers/Global';
import { UserList } from '../user/UserList';

export const Following = () => {

    const [users, setUsers] = useState([]);
    
    const [page, setPage] = useState(1);
    const [following, setFollowing] = useState([]);
    const [more, setMore] = useState(true);
  const params = useParams();
    useEffect(() => {
      getUser(1);
    }, [])
  
    const getUser = async (nextPage = 1) => {
  
      const token = localStorage.getItem("token");
      const userId = params.userId;
  
      const { datos } = await PetitionFetchToken(Global.url + "follow/following/"+ userId+"/" + nextPage, "GET", token);
  
      let cleanUsers = [];
        datos.follows.forEach(follow => {
            cleanUsers = [...cleanUsers, follow.followed]
        })
        datos.users = cleanUsers;

      if (datos.users && datos.status === "success") {
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
  
  