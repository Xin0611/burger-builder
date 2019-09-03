export const updateObject = (oldObject, updatePropertities) => {
  return {
    ...oldObject,
    ...updatePropertities
  }
}