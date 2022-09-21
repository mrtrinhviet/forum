export const findById = (resouces, id) => {
  if (!resouces) return null
  return resouces.find(resouce => resouce.id === id)
}

export const upsert = (resouces, resouce) => {
  if (!resouces) return null
  const index = resouces.findIndex(r => r.id === resouce.id)
  if (resouce.id && index !== -1) {
    resouces[index] = resouce
  } else {
    resouces.push(resouce)
  }
}

export const docToResource = doc => {
  if (typeof doc?.data !== 'function') return doc
  return { ...doc.data(), id: doc.id }
}

export const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { childId, parentId }) => {
    const resource = findById(state.items, parentId)
    if (!resource) {
      console.warn(
        `Appending ${child} ${childId} to ${parent} ${parentId} failed because the parent doesn't exist`
      )
      return
    }
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) resource[child].push(childId)
  }
}

export const makeFetchItemAction = ({ emoji, resource }) => {
  return ({ dispatch }, payload) =>
    dispatch('fetchItem', { emoji, resource, ...payload }, { root: true })
}

export const makeFetchItemsAction = ({ emoji, resource }) => {
  return ({ dispatch }, payload) =>
    dispatch('fetchItems', { emoji, resource, ...payload }, { root: true })
}

export const arrayRandom = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
