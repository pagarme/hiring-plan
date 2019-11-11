import styled from 'styled-components'

const Name = styled.div``

const Role = styled.div``

const StyledMember = styled.div`
  padding: .2rem;
  background: rgba(0,0,0,.1);
  text-align: center;
  border: 1px solid rgba(0,0,0,.1);
  font-size: 1.3rem;
`

const Member = ({ name, role, children }) => {
  return (
    <StyledMember>
      <Name>{name}</Name>
      <Role>{role}</Role>
      {children}
    </StyledMember>
  )
}

export default Member