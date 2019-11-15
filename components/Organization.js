import styled from 'styled-components'
import { omit } from 'ramda'
import Member from './Member'
import Team from './Team'

const StyledOrganization = styled.div`
  margin: 2rem;
  display: grid;
`

const Organization = ({ data, children }) => {
  const render = (node) => {
    const key = node.id || node.name

    const Component = node.type === 'team'
      ? Team
      : Member

    const componentProps = omit(['type', 'children'], node)

    if (node.children) {
      return (
        <Component key={key} {...componentProps}>
          {node.children.map(render)}
        </Component>
      )
    }

    return <Component key={key} {...componentProps} />
  }

  return (
    <StyledOrganization>{render(data)}</StyledOrganization>
  )
}

export default Organization