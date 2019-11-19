import styled from 'styled-components'
import { propOr } from 'ramda'

const Highlight = styled.div`
  font-weight: bold;
`

const Text = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
`

const roleTypeColorMap = {
  Engineering: 'yellow',
  Product: 'salmon',
  Design: 'red',
}

const StyledMember = styled.div`
  padding: .8rem .2rem ;
  background: rgba(0,0,0,.1);
  text-align: center;
  border: 1px solid rgba(0,0,0,.2);
  font-size: 1.3rem;

  background: ${(props) => {
    if (props.isEmpty) return props.theme.colors.green

    return props.theme.colors[propOr('gray', props.roleType, roleTypeColorMap)]
  }};
`

const Member = (props) => {
  const {
    name,
    role,
    roleType,
    timeframe,
    isHidden,
    children,
  } = props

  const isEmpty = name === 'Vaga'

  return !isHidden && (
    <StyledMember roleType={roleType} isEmpty={isEmpty}>
      <Highlight>{role}</Highlight>
      <Text>{name} {isEmpty && `(${timeframe})`}</Text>
      {children}
    </StyledMember>
  )
}

export default Member
