import { AxiosError } from "axios"
import { axiosAPI } from "./axios"

export const searchWorks = async (params:SearchParams):Promise<MethodResponse<SearchWork, AxiosError>> => {
  try {
    const { data } = await axiosAPI.get<ResAllWorks>('/api/work/search', {
      params
    })
    const { result, pagination } = data
    return {
      data: {
        result,
        pagination
      },
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError
    }
  }
}
export const createWork = async (data:ReqWork):Promise<MethodResponse<Work, AxiosError>> => {
  try {
    const { data:resData } = await axiosAPI.post<Work>(`/api/work`, data)
    return {
      data: resData,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError
    }
  }
}

export const editWork = async (id:string,data:ReqWork):Promise<MethodResponse<Work, AxiosError>> => {
  try {
    const { data:resData } = await axiosAPI.patch<Work>(`/api/work/${id}`, data)
    return {
      data: resData,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError
    }
  }
}


export const getYearList = () => {
  const currentYear = (new Date()).getFullYear();
  const LastYear = 2000
  let yearArray:number[] = []
  
  for(let countYear = currentYear;  countYear > LastYear; countYear --) {
    yearArray.push(countYear)
  }

  return yearArray.map(year => ({
    value: year.toString(),
    id: year.toString()
  }))
}