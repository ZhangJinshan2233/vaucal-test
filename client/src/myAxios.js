import axios from 'axios';
let token=localStorage.getItem("accessToken");

var myAxios=axios.create({
  baseURL: '/api/v0',
  timeout: 700,
  headers: {'Authorization': `bearer ${token}`}
});
export default myAxios