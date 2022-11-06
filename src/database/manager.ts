import { AxiosError } from "axios"
import { axiosAPI } from "./axios"

export const authenticate = async (data:ReqAuthenticate):Promise<MethodResponse<Manager, AxiosError>> => {
  try {
    const { data:dataRes } = await axiosAPI.post<Manager>(`/api/admin/login`, data)

    return {
      data: dataRes,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError
    }
  }
}

interface Verify {
  loogged: boolean
}

export const checkIsAdmin = async (token?: string):Promise<boolean> => {
  if(!token) return false
  try {
    await axiosAPI.get<Verify>(`/api/admin/verify`, {
      headers: {
        cookie: `TGManager_Admin_Token=${token}`
      }
    })
    return true
  } catch (error) {
    return false
  }
}