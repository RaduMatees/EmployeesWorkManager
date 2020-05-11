import axios, { AxiosInstance } from 'axios'
import { TypeRegister, TypeLogin } from '@/interfaces/type-auth'

export default class ApiClient {
  public restClient: AxiosInstance
  private static _instance: ApiClient

  constructor() {
    this.restClient = axios.create({
      baseURL: `http://localhost:5000`,
      headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': "*" }
    })
  }

  public static getInstance() {
    return this._instance || (this._instance = new this())
  }

  public setTokenFromStorage() {
    const token = localStorage.getItem('token')
    if (token) {
      this.restClient.defaults.headers.common['x-auth-token'] = token
      return true
    }
    return false
  }

  public clearToken() {
    localStorage.removeItem('token')
    delete this.restClient.defaults.headers.common['x-auth-token']
  }

  private setToken(token: string) {
    localStorage.setItem('token', token)
    this.restClient.defaults.headers.common['x-auth-token'] = token
  }

  async registerUser(formData: TypeRegister) {
    const { name, email, password, role } = formData
    const newAdmin = { name, email, password }

    try {
      const body = JSON.stringify(newAdmin)
      const res = await this.restClient.post(`/api/users/register-${role}`, body)
      console.log('Succesfully registered the user')

      this.setToken(res.data.token)
      return res.data.success
    } catch (err) {
      console.error('Error registering a user', err.response.data)

      this.clearToken()
      return err.response.data.success
    }
  }

  async loginUser(formData: TypeLogin) {
    const { email, password, role } = formData
    const user = { email, password, role }

    try {
      const body = JSON.stringify(user)
      const res = await this.restClient.post(`/api/users/login-${role}`, body)
      console.log('Succesfully logged in')

      this.setToken(res.data.token)
      return { success: res.data.success, status: res.status }
    } catch (err) {
      console.error('Error loggin in', err.response.data)

      this.clearToken()
      return { success: err.response.data.success, status: err.response.status }
    }
  }

  async getAccessTokenFromGithub(code: string) {
    try {
      const response = await this.restClient.post(`/api/oauth/github-token/${code}`)
      console.log('ressss', response.data.token)
    } catch (err) {
      console.error('Error retreiving the access token from Github', err)
    }
  }

}