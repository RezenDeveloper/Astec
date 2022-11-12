interface Obj {
  [key: string]: any
}

export const removeUndefinedFromObject = (obj:Obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if(value === undefined) delete obj[key]
  }
  return obj
}