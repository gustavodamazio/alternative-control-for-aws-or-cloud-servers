import { HttpStatusCode } from './HttpStatusCodes'

export default interface HttpsResponse<T = { [key: string]: any }> {
  details: T
  message: string
  status_code: HttpStatusCode
  status_message: string
  type: 'success' | 'error'
}
