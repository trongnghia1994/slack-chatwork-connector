import axios from 'axios'

export function post(url: string) {
  return (headers: any) => async (body: any) => {
	console.log('DEBUG', url, body, headers);
    const response = await axios.post(url, body, headers)
    return response
  }
}
