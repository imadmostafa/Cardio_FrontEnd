import axios from 'axios';

const BASE_API_URL = 'http://192.168.0.102:8000/api'; //for laravel backend
const BASE_API_URL_ASPNETCORE ='https://localhost:44319/api';

/*let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] =  'Bearer '+token;*/ //when using laravelpassport auth
    
export default {

        //Laravel 
        getAllPatients: () => 
        axios.get(BASE_API_URL+"/patient_records"),
        getRecordsById: (Id) => 
        axios.get(BASE_API_URL+"/records/"+Id),
        SignIn: (post) =>
        axios.post(BASE_API_URL+"/login", post),

        //ASP.NET CORE API
        getAllPatients_ASP: () => 
        axios.get(BASE_API_URL_ASPNETCORE+"/patientrecords"),
        getRecordsById_ASP: (Id) => 
        axios.get(BASE_API_URL_ASPNETCORE+"/patientrecords/"+Id),
   
    }
