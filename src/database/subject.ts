import { axiosAPI } from "./axios"

export const getAllSubjects = async ():Promise<MethodResponse<Subject[]>> => {

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
      error
    }
  }
}

export const createSubject = async (data:ReqSubject):Promise<MethodResponse<Subject>> => {
  try {
    const { data:dataRes } = await axiosAPI.post<Subject>(`/api/subject`, data)

    return {
      data: dataRes,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error
    }
  }
}

export const updateSubject = async (id:string, data:ReqUpdateSubject):Promise<MethodResponse<Subject>> => {
  try {
    const { data:dataRes } = await axiosAPI.put<Subject>(`/api/subject/${id}`, data)
    return {
      data: dataRes,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error
    }
  }
}