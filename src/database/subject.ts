import { AxiosError } from "axios"
import { axiosAPI } from "./axios"

export const getAllSubjects = async ():Promise<MethodResponse<Subject[], AxiosError>> => {

  try {
    const { data } = await axiosAPI.get<Subject[]>(`/api/subject`)
    return {
      data,
      error: null
    }    
  } catch (error) {
    console.log(error)
    return {
      data: null,
      error: error as AxiosError
    }
  }
}

export const createSubject = async (data:ReqSubject):Promise<MethodResponse<Subject, AxiosError>> => {
  try {
    const { data:dataRes } = await axiosAPI.post<Subject>(`/api/subject`, data)

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

export const updateSubject = async (id:string, data:ReqUpdateSubject):Promise<MethodResponse<Subject, AxiosError>> => {
  try {
    const { data:dataRes } = await axiosAPI.put<Subject>(`/api/subject/${id}`, data)
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

export const deleteSubject = async (id:string):Promise<MethodResponse<Subject, AxiosError>> => {
  try {
    const { data:dataRes } = await axiosAPI.delete<Subject>(`/api/subject/${id}`)
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