import 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'

const API_PROTOCOL = 'http'
const API_HOST = 'localhost'
const API_PORT = '3031'

const API_URI = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`

export const fetchPeoples = () => ajax.getJSON(`${API_URI}/peoples`)

export const fetchPeople = (id) => ajax.getJSON(`${API_URI}/peoples/${id}`)

export const savePeople = (people) => {
  const {
    id,
  } = people

  const setting = {
    method: 'PUT',
    url: `${API_URI}/peoples/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(people),
  }

  return ajax(setting)
}
