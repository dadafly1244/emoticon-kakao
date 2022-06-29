import axios from 'axios'

export default {
  install(app) {
    app.config.globalProperties.$request = async options => {
      
      const {requestCategory = '', method, body} = options
      const accessToken = window.localStorage.getItem('token')

      const res = await axios (`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/search${requestCategory}`,{
        method,
        headers: {
          'content-type': 'application/json',
          apikey: 'FcKdtJs202204',
          username: 'KDTTEAM8',
          masterkey: true,
          Authorization: `Bearer ${accessToken}`,
        },
        body
      })
      return res
    }
  }
}