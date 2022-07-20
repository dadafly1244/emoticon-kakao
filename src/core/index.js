import axios from 'axios'
export async function validateTokenUser(accessToken) {
  const res = await axios('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      apikey: 'FcKdtJs202204',
      username: 'KDT2TEAM8',
      masterkey: true,
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return await res
}
