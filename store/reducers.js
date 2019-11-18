import {
  filter,
  keys,
  mapObjIndexed,
  pickBy,
  pipe,
  prop,
  reduce,
} from 'ramda'
import { buildOrganogramFromEntries } from '../adapters/spreadsheet';

const filterEntries = (filters, entries) => {
  const isActive = (val) => val === true

  const pickActiveFilters = pipe(
    pickBy(isActive),
    keys
  )

  const activeFilters = mapObjIndexed(pickActiveFilters, filters)

  return filter(entry => {
    return pipe(
      keys,
      reduce((shouldKeep, filterKey) => {
        return shouldKeep && activeFilters[filterKey].includes(prop(filterKey, entry))
      }, true)
    )(activeFilters)
  })(entries)
}

export const mainReducer = (state, action) => {
  const { filters, entries, organogram } = state
  const { type, payload } = action

  switch (type) {
    case 'CHANGE_FILTER':
      const { key, newFilterState } = payload 

      const newFilters = {
        ...filters,
        [key]: newFilterState,
      }

      const activeEntries = filterEntries(newFilters, entries)
      const organogram = buildOrganogramFromEntries(activeEntries)

      return {
        ...state,
        organogram,
        filters: newFilters,
      }
      
    default:
      return state
  }
}