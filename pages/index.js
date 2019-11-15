import { useEffect } from 'react'
import { useStore } from '../store'
import fetch from 'isomorphic-fetch'
import { transformSpreadsheetData } from '../adapters/spreadsheet'
import Organization from '../components/Organization'

const Home = (props) => {
  const [_, dispatch] = useStore()

  useEffect(() => {
    dispatch({
      type: 'CHANGE_DATA',
      payload: props.data,
    })
  }, [props.data])

  return (
    <div>
      <Organization data={props.data} />
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