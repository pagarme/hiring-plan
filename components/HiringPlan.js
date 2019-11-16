import styled from 'styled-components'
import { omit } from 'ramda'
import { useStore } from '../store'
import Member from './Member'
import Team from './Team'

const StyledHiringPlan = styled.div`
  margin: 2rem;
  display: grid;
`

const HiringPlan = ({ children }) => {
  const [state, dispatch] = useStore()
  const data = state.data

  const renderTree = (node) => {
    const key = node.id || node.name

    const Component = node.type === 'team'
      ? Team
      : Member

    const componentProps = omit(['type', 'children'], node)

    if (node.children) {
      return (
        <Component key={key} {...componentProps}>
          {node.children.map(renderTree)}
        </Component>
      )
    }

    return <Component key={key} {...componentProps} />
  }

  return (
    <StyledHiringPlan>{renderTree(data)}</StyledHiringPlan>
  )
}

export default HiringPlan