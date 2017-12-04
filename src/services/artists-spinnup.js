import 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'

const API_PROTOCOL = 'http'
const API_HOST = 'localhost'
const API_PORT = '3031'

const API_URI = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`

export const fetchReleases = () => {
  return ajax.getJSON(`${API_URI}/releases`)
}

export const fetchRelease = (id) => {
  return ajax.getJSON(`${API_URI}/releases/${id}`)
}

export const saveRelease = (release) => {
  const {
    id,
  } = release

  const setting = {
    method: 'PUT',
    url: `${API_URI}/releases/${id}`,
    body: release,
  }

  return ajax(setting)
  
}
