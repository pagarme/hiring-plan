import styled from 'styled-components'
import { Fragment, useState } from 'react'
import { useStore } from '../store'
import Checkbox from '../components/Checkbox'

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
  const [options, toggleOptions] = useState(props.options)

  const handleCheckboxChange = event => {
    toggleOptions({ 
      ...options,
      [event.target.name]: event.target.checked 
    })
  }

  return (
    <StyledFilterList>
      <legend>{props.name}</legend>

      {Object.keys(options).map((key) => (
        <Checkbox
          name={key}
          key={key}
          checked={options[key]}
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

  return (
    <FilterContainer>
      <FilterList name="Types" options={state.filters.roleTypes} />
      <FilterList name="Roles" options={state.filters.roles} />
      <FilterList name="Timeframes" options={state.filters.timeframes} />
    </FilterContainer>
  )
}

export default Filters