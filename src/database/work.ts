export const getWork = (id: string): Work | null => {

  return {
    title: 'Trabalho de Graduação Teste',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
    fileId: 'teste',
    authorArray: ['autor1', 'autor2', 'autor3'],
    tagArray: ['tag1', 'tag2', 'tag3', 'tag4'],
    subject: 'Análise e Desenvolvimento de Sistemas',
    year: 2015
  }
}

export const getAllWorks = (): Work[] | null => {

  return [
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'teste',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    },
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'teste',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    },
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'teste',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    },
    {
      title: 'teste',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consectetur nibh eu luctus consequat. Praesent a scelerisque elit. Sed cursus diam ac ligula vehicula, ut tincidunt magna fringilla. Nullam lobortis dui a massa bibendum, vel porta neque sodales. Nam vestibulum justo nec condimentum luctus. Cras eros dui, porta vitae auctor a, cursus nec nisl. Vivamus pretium ex eu felis consequat lobortis. ',
      fileId: 'teste',
      authorArray: ['teste', 'teste', 'teste'],
      tagArray: ['teste', 'teste', 'teste', 'teste'],
      subject: 'Análise e Desenvolvimento de Sistemas',
      year: 2015
    }
  ]
}