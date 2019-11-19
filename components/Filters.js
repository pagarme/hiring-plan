import styled from 'styled-components'
import { useStore } from '../store'
import Checkbox from './Checkbox'

const StyledFilterList = styled.fieldset`
  display: grid;
  border: 2px solid black;
  padding: 1.5rem;

  legend {
    padding: 0 .5rem;
    font-weight: bold;
  }
`

const FilterList = (props) => {
  const { filters } = props

  const handleCheckboxChange = (event) => {
    const newFilters = {
      ...filters,
      [event.target.name]: event.target.checked,
    }

    props.onChange(newFilters)
  }

  return (
    <StyledFilterList>
      <legend>{props.name}</legend>

      {Object.keys(filters).map(key => (
        <Checkbox
          name={key}
          key={key}
          checked={filters[key]}
          onChange={handleCheckboxChange}
        />
      ))}
    </StyledFilterList>
  )
}

const FilterContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, max-content));
`

const Filters = () => {
  const [state, dispatch] = useStore()

  const handleChange = key => (filters) => {
    dispatch({
      type: 'CHANGE_FILTER',
      payload: {
        key,
        newFilterState: filters,
      },
    })
  }

  return (
    <FilterContainer>
      <FilterList name="Types" onChange={handleChange('roleType')} filters={state.filters.roleType} />
      <FilterList name="Roles" onChange={handleChange('role')} filters={state.filters.role} />
      <FilterList name="Timeframes" onChange={handleChange('timeframe')} filters={state.filters.timeframe} />
    </FilterContainer>
  )
}

export default Filters
