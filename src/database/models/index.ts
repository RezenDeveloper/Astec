import AuthorObj from './Author'
import SubjectObj from './Subject'
import WorkObj from './Work'

WorkObj.associate()
SubjectObj.associate()
AuthorObj.associate()

const Work = WorkObj.Model
const Subject = SubjectObj.Model
const Author = AuthorObj.Model

export {
  Work,
  Subject,
  Author,
}