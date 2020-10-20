import { AxiosResponse } from 'axios'
import HttpsResponse from '../models/HttpsResponse'
import api from './Api'

export interface UserLogged {
  email: string
  id: string
  name: string
}

export interface SingInDetailsPayload {
  user: UserLogged
  token: string
}

abstract class AuthService {
  static async singIn(email: string, password: string): Promise<AxiosResponse<HttpsResponse<SingInDetailsPayload>>> {
    return api.post<HttpsResponse<SingInDetailsPayload>>('/auth/login', { email, password })
  }
  static async singUp(
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<HttpsResponse<SingInDetailsPayload>>> {
    return api.post<HttpsResponse<SingInDetailsPayload>>('/auth/register', { email, password, name })
  }

  static async forgotPass(email: string): Promise<AxiosResponse<HttpsResponse<{}>>> {
    return api.post<HttpsResponse<SingInDetailsPayload>>('/auth/forgot-pass', { email })
  }
  static async resetPass(
    email: string,
    passwordResetToken: string,
    password: string
  ): Promise<AxiosResponse<HttpsResponse<{}>>> {
    return api.post<HttpsResponse<SingInDetailsPayload>>('/auth/reset-pass', { email, passwordResetToken, password })
  }
}

export default AuthService
