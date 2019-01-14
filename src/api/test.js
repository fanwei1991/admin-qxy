import { getRequest } from './axios.config'

export const getInfo = function () {
  return getRequest('base/getinfo')
}
