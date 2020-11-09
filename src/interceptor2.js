import axios from 'axios'
import {router} from './main'
import store from '@/store'
import { ACTION_LOGOUT } from './store/app.store'

// Add a response interceptor
axios.interceptors.response.use((response) => { 
    return response;
},  (error) => {
    if (error.response.status == 401) {
        console.log('unauthorized, logging out ...')
        store.dispatch(ACTION_LOGOUT)
        router.push('/login')
    }
    return Promise.reject(error);
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    return config;
}, function(error) {
    return Promise.reject(error)
})