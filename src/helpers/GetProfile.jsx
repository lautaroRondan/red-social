import { Global } from "./Global";
import { PetitionFetchToken } from "./PetitionFetch";

export const GetProfile = async(userId, setState) => {

    const { datos } = await PetitionFetchToken(Global.url + "user/profile/"+ userId, "GET", localStorage.getItem("token"));
  
    if (datos.status === "success") {
      setState(datos.user);
    }

    return datos;
  }