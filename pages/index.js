import fetch from 'isomorphic-fetch'
import { useEffect } from 'react'
import { useStore } from '../store'
import { transformSpreadsheetData } from '../adapters/spreadsheet'
import Organization from '../components/Organization'

const Home = (props) => {
  const [state, dispatch] = useStore()

  const data = state.data.length || props.data

  useEffect(() => {
    dispatch({ type: 'CHANGE_DATA', payload: props.data })
  })

  return (
    <div>
      <Organization data={data} />
    </div>
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
