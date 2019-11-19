import {
  always,
  applySpec,
  defaultTo,
  eqBy,
  filter,
  find,
  groupBy,
  groupWith,
  head,
  invoker,
  map,
  path,
  pipe,
  pluck,
  prop,
  propEq,
  tail,
  uniq,
} from 'ramda'

const HEADER_COLS = {
  parentTeam: '1',
  team: '2',
  name: '3',
  role: '4',
  roleType: '5',
  timeframe: '6',
}

export const buildOrganogramFromEntries = (entries) => {
  const rootTeam = pipe(
    find(propEq('parentTeam', '-')),
    prop('team')
  )(entries)

  const teamEntryMap = groupBy(prop('team'), entries)

  const buildTeamTree = (team) => {
    const childTeams = pipe(
      filter(propEq('parentTeam', team)),
      map(prop('team')),
      uniq
    )(entries)

    const members = pipe(
      prop(team),
      defaultTo([]),
      map(applySpec({
        id: prop('id'),
        type: always('member'),
        isHidden: prop('isHidden'),
        role: prop('role'),
        name: prop('name'),
        roleType: prop('roleType'),
        timeframe: prop('timeframe'),
      }))
    )(teamEntryMap)

    return {
      type: 'team',
      name: team,
      children: [
        ...members,
        ...childTeams.map(buildTeamTree),
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
  id: pipe(head, prop('row')),
  parentTeam: findValueByCol(HEADER_COLS.parentTeam),
  team: findValueByCol(HEADER_COLS.team),
  name: findValueByCol(HEADER_COLS.name),
  role: findValueByCol(HEADER_COLS.role),
  roleType: findValueByCol(HEADER_COLS.roleType),
  timeframe: findValueByCol(HEADER_COLS.timeframe),
})

export const getMetadataFromEntries = (entries) => {
  const pickUniq = key => pipe(
    pluck(key),
    uniq,
    invoker(0, 'sort')
  )(entries)

  return {
    teams: pickUniq('team'),
    timeframes: pickUniq('timeframe'),
    roles: pickUniq('role'),
    roleTypes: pickUniq('roleType'),
  }
}

export const parseSpreadsheetData = pipe(
  path(['feed', 'entry']),
  map(prop('gs$cell')),
  groupEntriesByRow,
  tail,
  map(transformEntry)
)
