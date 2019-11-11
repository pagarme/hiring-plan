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
    const Component = node.type === 'team'
      ? Team
      : Member

    const componentProps = omit(['type', 'children'], node)

    if (node.children) {
      return (
        <Component key={node.name} {...componentProps}>
          {node.children.map(render)}
        </Component>
      )
    }

    return <Component key={node.name} {...componentProps} />
  }

  return (
    <StyledOrganization>{render(data)}</StyledOrganization>
  )
}

export default Organization