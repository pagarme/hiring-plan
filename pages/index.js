import React from 'react'
import Organization from '../components/Organization'
import Member from '../components/Member'
import Team from '../components/Team'

const data = {
  type: 'team',
  name: 'Strategy I',
  children: [
    {
      type: 'member',
      role: 'Product Leader',
      name: 'Tim Apple',
    },
    {
      type: 'member',
      role: 'Engineering Manager',
      name: 'John Doe',
    },
    {
      type: 'team',
      name: 'Product I',
      children: [
        {
          type: 'member',
          role: 'Product Manager',
          name: 'Steve Young',
        },
        {
          type: 'member',
          role: 'Tech Lead',
          name: 'Sarah Pearson',
        },
      ],
    },
  ],
}

const Home = (props) => {
  return (
    <Organization>
      <Team name="Strategy">
        <Member name="Tim Apple" role ="Product Leader" />
        <Member name="Jane Doe" role ="Engineering Manager" />
        <Member name="Tim Apple" role ="Product Leader" />

        <Team name="Product I">
          <Member name="Steve Young" role="Product Manager" />
          <Member name="Sarah Morgan" role="Tech Lead" />

          <Team name="Project I">
            <Member name="Sadie Brown" role="Product Manager" />
            <Member name="Arthur Lyn" role="Tech Lead" />
            <Member name="Sadie Brown" role="Product Manager" />
            <Member name="Arthur Lyn" role="Tech Lead" />
            <Member name="Sadie Brown" role="Product Manager" />
            <Member name="Arthur Lyn" role="Tech Lead" />
            <Member name="Sadie Brown" role="Product Manager" />
            <Member name="Arthur Lyn" role="Tech Lead" />
          </Team>
        </Team>
      </Team>
    </Organization>
  )
}

export default Home
