import {
  assoc,
  filter,
  keys,
  map,
  mapObjIndexed,
  not,
  pickBy,
  pipe,
  prop,
  reduce,
} from 'ramda'
import { buildOrganogramFromEntries } from '../adapters/spreadsheet';

const updateEntriesVisibility = (filters, entries) => {
  const isActive = (val) => val === true

  const pickActiveFilters = pipe(
    pickBy(isActive),
    keys
  )

  const activeFilters = mapObjIndexed(pickActiveFilters, filters)

  return map((entry) => {
    const shouldHideEntry = pipe(
      keys,
      reduce((shouldBeVisible, filterKey) => {
        return shouldBeVisible 
          && activeFilters[filterKey].includes(prop(filterKey, entry))
      }, true),
      not
    )(activeFilters)

    return assoc('isHidden', shouldHideEntry, entry)
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

      const newEntries = updateEntriesVisibility(newFilters, entries)
      const organogram = buildOrganogramFromEntries(newEntries)

      return {
        ...state,
        organogram,
        filters: newFilters,
      }
      
    default:
      return state
  }
}