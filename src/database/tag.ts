import { AxiosError } from "axios"
import { axiosAPI } from "./axios"

export const getAllTags = async ():Promise<MethodResponse<SearchTag[], AxiosError>> => {
  try {
    const { data } = await axiosAPI.get<SearchTag[]>(`/api/tag`)
    return {
      data,
      error: null
    }    
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError
    }
  }
}