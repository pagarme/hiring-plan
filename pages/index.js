import React from 'react'
import { transformSpreadsheetData } from '../adapters/spreadsheet'
import Organization from '../components/Organization'
import Member from '../components/Member'
import Team from '../components/Team'

const Home = (props) => {
  const data = transformSpreadsheetData(props.spreadsheetData)

  return (
    <Organization data={data}>
    </Organization>
  )
}

export default Home
