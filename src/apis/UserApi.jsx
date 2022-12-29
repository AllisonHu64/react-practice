import axios from "axios";

class UserApi {
    constructor(){
        const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN;
        const backendPort = process.env.REACT_APP_BACKEND_PORT;
        this.baseUrl = `http://${backendDomain}:${backendPort}/rest-practice-backend/v1`
        this.defaultConfig = {
            method: 'post',
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        }     
    }

    async getUsers(){
        return axios({
            ...this.defaultConfig,
            method: 'get',
            url: `${this.baseUrl}/users`
        }).catch((err)=>{
            throw `Failed to get users: ${err.response?.data?.message ?? "Unknown error"}`
        })
    }

    async addUser(payloads) {
        return axios({
            ...this.defaultConfig,
            method: 'post',
            url: `${this.baseUrl}/user`,
            data: payloads
        }).catch((err)=>{
            throw `Failed to add user: ${err.response?.data?.message ?? "Unknown error"}`
        })
    }

    async editUser(payloads) {
        return axios({
            ...this.defaultConfig,
            method: 'patch',
            url: `${this.baseUrl}/user`,
            data: payloads
        }).catch((err)=>{
            throw `Failed to edit user: ${err.response?.data?.message ?? "unknown error"}`
        })
    }

    async deleteUser(id) {
        return axios({
            ...this.defaultConfig,
            method: 'delete',
            url: `${this.baseUrl}/user/${id}`,
        }).catch((err)=>{
            throw `Failed to delete user: ${err.response?.data?.message ?? "unknown error"}`
        })
    }
}

export default UserApi;