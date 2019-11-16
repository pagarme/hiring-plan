import {
  always,
  applySpec,
  eqBy,
  filter,
  find,
  groupBy,
  groupWith,
  invoker,
  map,
  path,
  pipe,
  pluck,
  prop,
  propEq,
  sort,
  tail,
  uniq,
} from 'ramda'

import * as R from 'ramda'

const HEADER_COLS = {
  parentTeam: '1',
  team: '2',
  name: '3',
  role: '4',
  roleType: '5',
  timeframe: '6'
}

const buildOrganogram = (entries) => {
  const rootTeam = pipe(
    find(propEq('parentTeam', '-')),
    prop('team')
  )(entries)

  const teamEntryMap = groupBy(prop('team'), entries)

  const buildTeamTree = team => {
    const childTeams = pipe(
      filter(propEq('parentTeam', team)),
      map(prop('team')),
      uniq
    )(entries)

    const members = pipe(
      prop(team),
      map(applySpec({
        type: always('member'),
        role: prop('role'),
        name: prop('name'),
        roleType: prop('roleType'),
        timeframe: prop('timeframe'),
        id: prop('id'),
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
  }

  return buildTeamTree(rootTeam)
}

const groupEntriesByRow = groupWith(eqBy(prop('row')))

const findValueByCol = col => pipe(
  find(propEq('col', col)),
  prop('inputValue')
)

const transformEntry = applySpec({
  id: R.pipe(R.head, R.prop('row')),
  parentTeam: findValueByCol(HEADER_COLS.parentTeam),
  team: findValueByCol(HEADER_COLS.team),
  name: findValueByCol(HEADER_COLS.name),
  role: findValueByCol(HEADER_COLS.role),
  roleType: findValueByCol(HEADER_COLS.roleType),
  timeframe: findValueByCol(HEADER_COLS.timeframe),
})

export const transformSpreadsheetData = (spreadsheetData) => {
  const entries = pipe(
    path(['feed', 'entry']),
    map(prop('gs$cell')),
    groupEntriesByRow,
    tail,
    map(transformEntry)
  )(spreadsheetData)

  const pickUniq = prop => pipe(
    pluck(prop),
    uniq,
    invoker(0, 'sort')
  )(entries)

  return {
    rawData: entries,
    teams: pickUniq('team'),
    timeframes: pickUniq('timeframe'),
    roles: pickUniq('role'),
    roleTypes: pickUniq('roleType'),
    organogram: buildOrganogram(entries),
  }
}