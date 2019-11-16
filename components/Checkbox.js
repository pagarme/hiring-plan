import styled from 'styled-components'

const Input = styled.input`
  margin-right: 1rem;
`

const Label = styled.label`
  margin-bottom: .4rem;
  font-style: italic;
`

const Checkbox = props => (
  <Label>
    <Input type="checkbox" {...props} />
    {props.name}
  </Label>
)

export default Checkbox
