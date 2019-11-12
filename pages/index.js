import React from 'react'
import Organization from '../components/Organization'
import Member from '../components/Member'
import Team from '../components/Team'

import * as R from 'ramda'

const HEADER_COLS = {
  parentTeam: '1',
  team: '2',
  name: '3',
  role: '4',
}

const structureEntriesByTeams = (entries) => {
  const rootTeam = R.pipe(
    R.find(R.propEq('parentTeam', '-')),
    R.prop('team')
  )(entries)

  const teamEntryMap = R.groupBy(R.prop('team'), entries)

  const buildTeamTree = team => {
    const childTeams = R.pipe(
      R.filter(R.propEq('parentTeam', team)),
      R.map(R.prop('team')),
      R.uniq
    )(entries)

    const members = R.pipe(
      R.prop(team),
      R.map(R.applySpec({
        type: R.always('member'),
        role: R.prop('role'),
        name: R.prop('name')
      }))
    )(teamEntryMap)

    return {
      type: 'team',
      name: team,
      children: [
        ...members,
        ...childTeams.map(buildTeamTree)
      ],
    }
    return teamEntryMap
  }

  return buildTeamTree(rootTeam)
}

const groupEntriesByRow = R.groupWith(R.eqBy(R.prop('row')))

const findValueByCol = col => R.pipe(
  R.find(R.propEq('col', col)),
  R.prop('inputValue')
)

const transformEntry = R.applySpec({
  parentTeam: findValueByCol(HEADER_COLS.parentTeam),
  team: findValueByCol(HEADER_COLS.team),
  name: findValueByCol(HEADER_COLS.name),
  role: findValueByCol(HEADER_COLS.role),
})

const transformSpreadsheetData = (spreadsheetData) => {
  const rawEntries = R.pipe(
    R.path(['feed', 'entry']),
    R.map(R.prop('gs$cell')),
  )(spreadsheetData)

  const entries = R.pipe(
    groupEntriesByRow,
    R.tail,
    R.map(transformEntry)
  )(rawEntries)

  return structureEntriesByTeams(entries)
}

const Home = (props) => {
  const data = transformSpreadsheetData(props.spreadsheetData)

  return (
    <Organization data={data}>
    </Organization>
  )
}

export default Home
