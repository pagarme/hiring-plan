import styled from 'styled-components'
import { omit } from 'ramda'
import { useStore } from '../store'
import Member from './Member'
import Team from './Team'

const StyledHiringPlan = styled.div`
  margin-top: 2rem;
  display: grid;
`

const HiringPlan = () => {
  const [state] = useStore()
  const { organogram } = state

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
    <StyledHiringPlan>{renderTree(organogram)}</StyledHiringPlan>
  )
}

export default HiringPlan
