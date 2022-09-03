import AuthorObj from './Author'
import SubjectObj from './Subject'
import WorkObj from './Work'
import TagObj from './Tag'

TagObj.associate()
WorkObj.associate()
SubjectObj.associate()
AuthorObj.associate()

const Work = WorkObj.Model
const Subject = SubjectObj.Model
const Author = AuthorObj.Model
const Tag = TagObj.Model

export {
  Work,
  Subject,
  Author,
  Tag
}