import styled from 'styled-components'

const Role = styled.div`
  font-weight: bold;
`

const Name = styled.div``

const StyledMember = styled.div`
  padding: .2rem;
  background: rgba(0,0,0,.1);
  text-align: center;
  border: 1px solid rgba(0,0,0,.1);
  font-size: 1.3rem;
  background: ${props => props.theme.colors.green};
`

const Member = ({ name, role, children }) => {
  return (
    <StyledMember>
      <Role>{role}</Role>
      <Name>{name}</Name>
      {children}
    </StyledMember>
  )
}

export default Member