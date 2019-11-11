import styled from 'styled-components'

const Name = styled.div`
  grid-column: 1 / -1;
  font-style: italic;
  font-weight: bold;
`

const StyledTeam = styled.div`
  background: rgba(0,0,0,.1);
  padding: 2rem;
  display: grid;
  grid-column: 1 / -1;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, auto));
  grid-auto-flow: row;
`

const Team = ({ name, children }) => {
  return (
    <StyledTeam>
      <Name>{name}</Name>
      {children}
    </StyledTeam>
  )
}

export default Team