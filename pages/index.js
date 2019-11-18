import { reduce } from 'ramda'
import Store from '../store'
import fetch from 'isomorphic-fetch'
import HiringPlan from '../components/HiringPlan'
import Filters from '../components/Filters'
import { 
  parseSpreadsheetData, 
  buildOrganogramFromEntries, 
  getMetadataFromEntries,
} from '../adapters/spreadsheet'

const Index = (props) => {
  return (
    <Store initialState={props.data}>
      <Filters />
      <HiringPlan />
    </Store>
  )
}

Index.getInitialProps = async ({ query }) => {
  const toFilter = reduce((acc, item) => ({
    ...acc,
    [item]: true,
  }), {})

  const entries = await fetch(query.source)
    .then(res => res.json())
    .then(parseSpreadsheetData)

  const organogram = buildOrganogramFromEntries(entries)
  const { roleTypes, roles, timeframes } = getMetadataFromEntries(entries)

  const filters = {
    roleType: toFilter(roleTypes),
    role: toFilter(roles),
    timeframe: toFilter(timeframes),
  }

  return {
    data: {
      entries,
      organogram,
      filters,
    },
  }
}

export default Index