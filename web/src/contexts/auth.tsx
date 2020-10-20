import { AxiosError } from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import api from '../services/Api'
import AuthService, { SingInDetailsPayload, UserLogged } from '../services/AuthService'

export enum LocalStorageKeys {
  AppUser = '@App:user',
  AppToken = '@App:token'
}

interface AuthContextData {
  signed: boolean
  user: UserLogged | null
  SingIn: (
    email: string,
    password: string,
    remember: boolean,
    singInDetailsPayload?: SingInDetailsPayload | null
  ) => Promise<UserLogged>
  SingOut: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserLogged | null>(null)

  function setApiTokenDefault(token: string) {
    api.defaults.headers.Authorization = `Bearer ${token}`

    api.interceptors.response.use(
      response => {
        return response
      },
      (error: AxiosError) => {
        console.warn({ ...error })
        if (error.config.url?.includes('/machines/')) {
          if (401 === error.response?.status) {
            toast.warn('🔐 Sessão expirada, faça login novamente.', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            })
            SingOut()
            return
          }
        }
        return Promise.reject(error)
      }
    )
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem(LocalStorageKeys.AppUser)
    const storagedToken = localStorage.getItem(LocalStorageKeys.AppToken)

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser))
      setApiTokenDefault(storagedToken)
    }
    // eslint-disable-next-line
  }, [])

  async function SingIn(
    email: string,
    password: string,
    remember: boolean,
    singInDetailsPayload: SingInDetailsPayload | null = null
  ): Promise<UserLogged> {
    let details: SingInDetailsPayload = {} as SingInDetailsPayload

    if (!singInDetailsPayload) {
      const response = await AuthService.singIn(email, password)
      details = response.data.details
    } else {
      details = singInDetailsPayload
    }

    setApiTokenDefault(details.token)
    setUser(details.user)

    if (remember) {
      localStorage.setItem(LocalStorageKeys.AppUser, JSON.stringify(details.user))
      localStorage.setItem(LocalStorageKeys.AppToken, details.token)
    }
    return details.user
  }

  function SingOut() {
    console.warn('SingOut')
    setUser(null)
    localStorage.removeItem(LocalStorageKeys.AppUser)
    localStorage.removeItem(LocalStorageKeys.AppToken)
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, SingIn, SingOut }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export default AuthContext
