import { KeyboardEvent } from "react"

export const handleSelectKeyPress = (e:KeyboardEvent<HTMLLIElement>, callback:() => void) => {
  switch (e.key) {
    case " ":
    case "SpaceBar":
    case "Enter":
      e.preventDefault()
      callback()
      break
  }
}