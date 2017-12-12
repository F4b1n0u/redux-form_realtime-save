import React, { Component } from 'react'

import PeopleForm from '../containers/people-form'

export default class PeopleForms extends Component {
  componentWillMount() {
    const {
      load = () => {},
    } = this.props

    load()
  }

  render() {
    const {
      peopleIds,
    } = this.props

    return (
      <div>
        {
          peopleIds.map((id) => (
            <PeopleForm
              key={id}
              id={id}
            />
          ))
        }
      </div>
    )
  }
}
