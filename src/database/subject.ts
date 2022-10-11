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