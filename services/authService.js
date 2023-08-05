import axios from "axios";
import { Router } from "next/router";
import { setCookie } from '../utils/cookie';

export const signIn = async (user) => {
  try {
    axios.post("/api/login", { user })
      .then((response) => {
        if(response.data.user[0]){
          setCookie('token', response.data.user[0].token);
          document.location.href = "/admin/published"
          // return response.data.user[0];
        }
        else {
          console.log('login error')
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    console.error(error);
  }
};