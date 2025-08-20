import axios from "axios";
import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/providers/AuthProvider";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials : true,
  });

const useAxios = () => {

    const  {logOut} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(()=>{
        axiosInstance.interceptors.response.use(function (response) {
            
            return response;
          }, function (error) {
            if(error.status ===401 || error.status ==403){
                
                logOut()
                .then(()=>{
                    
                    navigate('/login')
                })
            }
            return Promise.reject(error);
          });

    },[])

    return axiosInstance;
}

export default useAxios;