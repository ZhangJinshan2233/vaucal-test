import axios from "axios";

export function requestGetUser(userCredential) {
  return axios.post({
    url: "/api/v0/signin",
    userCredential
  });
}