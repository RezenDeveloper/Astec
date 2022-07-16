
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

  const titleError = !title.length
  const descriptionError = !description.length
  const tagError = tagList.length < 3
  const authorError = authorList.length < 3
  const yearError = !year.length
  const subjectError = !subject.length
  const fileError = !file

  const hasErrors = titleError || descriptionError || tagError || authorError || yearError || subjectError || fileError
  
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