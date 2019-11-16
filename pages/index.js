import { useEffect } from 'react'
import Store from '../store'
import fetch from 'isomorphic-fetch'
import { transformSpreadsheetData } from '../adapters/spreadsheet'
import HiringPlan from '../components/HiringPlan'

const Home = (props) => {
  const initialState = {
    data: props.data,
    filters: {},
  }

  return (
    <Store initialState={initialState}>
      <HiringPlan />
    </Store>
  )
}

Home.getInitialProps = async ({ query }) => {
  const data = await fetch(query.source)
    .then(res => res.json())
    .then(transformSpreadsheetData)

  return {
    data,
  }
}

export default Home