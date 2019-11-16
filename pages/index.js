import { reduce } from 'ramda'
import Store from '../store'
import fetch from 'isomorphic-fetch'
import { transformSpreadsheetData } from '../adapters/spreadsheet'
import HiringPlan from '../components/HiringPlan'
import Filters from '../components/Filters'

const Index = (props) => {
  const toFilter = reduce((acc, item) => ({
    ...acc,
    [item]: true,
  }), {})

  const initialState = {
    data: props.data,
    filters: {
      teams: toFilter(props.data.teams),
      timeframes: toFilter(props.data.timeframes),
      roleTypes: toFilter(props.data.roleTypes),
      roles: toFilter(props.data.roles),
    },
  }

  return (
    <Store initialState={initialState}>
      <Filters />
      <HiringPlan />
    </Store>
  )
}

Index.getInitialProps = async ({ query }) => {
  const data = await fetch(query.source)
    .then(res => res.json())
    .then(transformSpreadsheetData)

  return {
    data,
  }
}

export default Index