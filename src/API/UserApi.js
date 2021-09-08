import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080',
    // headers:{
    //     Authorization: 'Client-ID ySLf97ArW5_njXLq958dz3F50rCrCX5c7XlE7iM2U1Y'
    // }s
});