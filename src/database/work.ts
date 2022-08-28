export const getWork = (id: string): Work | null => {

  return {
    title: 'Trabalho de Graduação Teste',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
    fileId: 'test',
    authorArray: ['autor1', 'autor2', 'autor3'],
    tagArray: ['tag1', 'tag2', 'tag3', 'tag4'],
    subject: 'Análise e Desenvolvimento de Sistemas',
    year: 2015
  }
}

export const getRecentWorks = () => {
  return [
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'test',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    },
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'test',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    },
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'test',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    }
  ]
}

export const getAllWorks = (): Work[] | null => {

  return [
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'test',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    },
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'test',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    },
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'test',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    },
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'test',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    }
  ]
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