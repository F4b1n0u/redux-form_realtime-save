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
          peopleIds.map((id, index) => (
            <PeopleForm
              key={id}
              index={index}
            />
          ))
        }
      </div>
    )
  }
}
