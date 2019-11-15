import styled from 'styled-components'

const Name = styled.div`
  grid-column: 1 / -1;
  font-weight: bold;
  font-size: 2rem;
`

const StyledTeam = styled.div`
  background: rgba(0,0,0,.03);
  border: 1px solid rgba(0,0,0,.2);
  padding: 2rem;
  display: grid;
  grid-column: 1 / -1;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, auto));
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