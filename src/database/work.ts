import { AxiosError } from "axios"
import { axiosAPI } from "./axios"

export const getWork = async (id: string):Promise<MethodResponse<Work, AxiosError>> => {
  try {
    const { data } = await axiosAPI.get<ResAllWorks>(`/api/work/${id}`)
    const { description, title, subject, tags, year } = data
    return {
      data: {
        id,
        title,
        description,
        year,
        authorArray: [],
        tagArray: tags.map(tag => tag.name),
        subject: {
          id: subject.id,
          name: subject.name,
          description: subject.description
        }
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

export const getRecentWorks = async ():Promise<MethodResponse<Work[], AxiosError>> => {
  try {
    const { data } = await axiosAPI.get<ResAllWorks[]>('/api/work', {
      params: {
        order: 'recent'
      }
    })
    return {
      data: data.map(({ id, description, title, subject, tags, year }):Work => ({
        id,
        title,
        description,
        year,
        authorArray: [],
        tagArray: tags.map(tag => tag.name),
        subject: {
          id: subject.id,
          name: subject.name,
          description: subject.description
        }
      })),
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError
    }
  }
}

export const getAllWorks = async ():Promise<MethodResponse<Work[], AxiosError>> => {
  try {
    const { data } = await axiosAPI.get<ResAllWorks[]>('/api/work')
    return {
      data: data.map(({ id, description, title, subject, tags, year }):Work => ({
        id,
        title,
        description,
        year,
        authorArray: [],
        tagArray: tags.map(tag => tag.name),
        subject: {
          id: subject.id,
          name: subject.name,
          description: subject.description
        }
      })),
      error: null
    }
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError
    }
  }
}

export const searchWorks = async (params:SearchParams):Promise<MethodResponse<Work[], AxiosError>> => {
  try {
    const { data } = await axiosAPI.get<ResAllWorks[]>('/api/work/search', {
      params: {
        ...params
      }
    })
    console.log(data)
    return {
      data: data.map(({ id, description, title, subject, tags, year }):Work => ({
        id,
        title,
        description,
        year,
        authorArray: [],
        tagArray: tags.map(tag => tag.name),
        subject: {
          id: subject.id,
          name: subject.name,
          description: subject.description
        }
      })),
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

export const getYearList = () => {
  const currentYear = (new Date()).getFullYear();
  const LastYear = 2000
  let yearArray:number[] = []
  
  for(let countYear = LastYear;  countYear <= currentYear; countYear ++) {
    yearArray.push(countYear)
  }

  return yearArray.map(year => ({
    value: year.toString(),
    id: year.toString()
  }))
}