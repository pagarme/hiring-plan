const dataReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_DATA':
      return action.payload
      
    default:
      return state
  }
}

const filtersReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.payload
      
    default:
      return state
  }
}

export const mainReducer = ({ data, filters }, action) => ({
  data: dataReducer(data, action),
  filters: filtersReducer(filters, action),
})