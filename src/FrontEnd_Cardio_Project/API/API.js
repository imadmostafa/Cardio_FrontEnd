import axios from 'axios';

const BASE_API_URL = 'http://192.168.0.102:8000/api';

let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
    
export default {
 
        getAllPatients: () => 
        axios.get(BASE_API_URL+"/patient_records"),
        getRecordsById: (Id) => 
        axios.get(BASE_API_URL+"/records/"+Id),
        SignIn: (post) =>
        axios.post(BASE_API_URL+"/login", post),
   
    }
