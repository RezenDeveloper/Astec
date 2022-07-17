import { WORK_MAX_AUTHORS, WORK_MAX_TAGS, WORK_MIN_AUTHORS, WORK_MIN_TAGS } from "./constants"

interface InputData {
  title: string,
  description: string,
  tagList: string[],
  authorList: string[],
  year: string,
  subject: string,
  file: File | undefined
}

interface CheckInputsReturn {
  errorList: ErrorObj
  hasErrors: boolean
}

export const checkInputs = (inputData: InputData): CheckInputsReturn => {
  
  const { title, authorList, description, tagList, year, subject, file } = inputData
  
  const titleError = !title.length ? 'error' : undefined
  const descriptionError = !description.length ? 'error' : undefined

  const tagError = tagList.length < WORK_MIN_TAGS 
    ? 'error__min' 
    : tagList.length > WORK_MAX_TAGS 
      ? 'error__max' : undefined
  
  const authorError = authorList.length < WORK_MIN_AUTHORS 
    ? 'error__min' 
    : authorList.length > WORK_MAX_AUTHORS
      ? 'error__max' : undefined

  const yearError = !year.length ? 'error' : undefined
  const subjectError = !subject.length ? 'error' : undefined
  const fileError = !file ? 'error' : undefined

  const hasErrors = !!titleError || !!descriptionError || !!tagError || !!authorError || !!yearError || !!subjectError || !!fileError
  
  return {
    hasErrors,
    errorList: {
      title: titleError,
      description: descriptionError,
      tag: tagError,
      author: authorError,
      year: yearError,
      subject: subjectError,
      file: fileError,
    }
  } 
}