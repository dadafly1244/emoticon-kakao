import axios from 'axios'

const TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikd5NjZubnJaMWNyaHNKRktac1A1IiwiaWF0IjoxNjU2NDAwNDg0LCJleHAiOjE2NTY0ODY4ODQsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.CN-49rsVqtqNOUmfba7cnw-2OVuWrcurg27i-9CVGxc"
const headers = {
	"content-type": "application/json",
	"apikey": "FcKdtJs202204",
	"username": "jusang_test",
	'Authorization': `Bearer ${TEST_TOKEN}`
}
const instance = axios.create({
	baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
	headers
})
const readAccounts = () => withHandler(instance.get('/banks'), data => data.map(bank => bank.name))
const readAccount = () => withHandler(instance.get('/'), data => data)
const createAccount = (accountObj) => {
	withHandler(instance.post('/', {
		...accountObj
	}), data => data)
}
const deleteAccount = (accountId, signature) => withHandler(instance.delete('/', { data: {accountId, signature} }), data => data)
export {
	readAccounts,
	readAccount,
	createAccount,
	deleteAccount
}

function withHandler(axiosRes, processData) {
	return new Promise(resolve => {
		axiosRes.then(res => resolve(processData(res.data))).catch(error => {
			const {
				response,
				request,
				message
			} = error
			if (response) {
				const {
					status
				} = response
				// 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
				console.log(`status: ${status}`)
			} else if (request) {
				// 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
				// node.js에서는 http.ClientRequest 인스턴스입니다.
				console.log('요청이 전송되었지만, 응답이 수신되지 않았습니다.')
			} else {
				// 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
				console.log(message)
			}
		})

	})
}