import { GetStaticProps } from "next"
import { getAllSubjects } from "../../database/subject"
import { getAllTags } from "../../database/tag"
import { getYearList } from "../../database/work"

import Search from "./[query]"

interface SearchProps { 
  subjectList: Subject[] | null
  tagList: SearchTag[] | null
  yearList: Year[] | null
}

export const getStaticProps: GetStaticProps<SearchProps> = async ({ params }) => {
  
  const { data: subjectList } = await getAllSubjects()
  const { data: tagList } = await getAllTags()
  return {
    props: {
      subjectList,
      tagList,
      yearList: getYearList()
    }
  }
}

export default Search