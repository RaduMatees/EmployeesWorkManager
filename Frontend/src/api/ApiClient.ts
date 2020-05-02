import axios, { AxiosInstance } from 'axios'
import { TypeRegister } from '@/interfaces/type-register'

export default class ApiClient {
  public restClient: AxiosInstance

  constructor() {
    this.restClient = axios.create({
      baseURL: `http://localhost:5000`,
      headers: { 'content-type': 'application/json' }
    })
  }

  async registerUser(formData: TypeRegister) {
    const { name, email, password, role } = formData
    const newAdmin = { name, email, password }

    try {
      const body = JSON.stringify(newAdmin)
      const res = await this.restClient.post(`/api/users/register-${role}`, body)
      console.log('Succesfully registered the user')
      // this.restClient.headers = { 'x-auth-token': `${res.data.token}` }
      return res.data
    } catch (err) {
      console.error('Error registering a user', err.response.data)
      return err.response.data
    }
  }

}