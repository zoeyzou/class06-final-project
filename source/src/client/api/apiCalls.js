import Axios from 'axios'

const errfunc = err => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(err.response.data)
    console.log(err.response.status)
    console.log(err.response.headers)
  } else if (err.request) {
    // The request was made but no response was received
    throw new Error(
      'Whoops something went wring while POSTing to server!: ' + err.request
    )
  } else {
    // Something happened in setting up the request that triggered an err
    throw new Error(
      'Whoops something went wring while POSTing to server!: ' + err.response
    )
  }
  console.log(err.config)
}

async function getProfileInfo() {
  const response = await Axios.post('/api/profile', { withCredentials: true }).catch(
    err => errfunc(err)
  )
  return response
}

async function isLoggedIn() {
  const response = await Axios.post('/api/profile')
    .catch(err => {
      if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else if (err.request) {
        throw new Error('Whoops something went wring while POSTing!: ' + err.request)
      } else {
        throw new Error(
          'Whoops something went wring while POSTing!: ' + err.response
        )
      }
      console.log(err.config)
    })
    .then(res => {
      // This checks if the user exists in our database. And returns a bool accordingly
      if ('id' in res.data) {
        return true
      } else {
        return false
      }
    })
  return await response
}

async function createNewClass(params) {
  console.log(params)
  const response = await Axios.post('/api/createclass', { data: params }).catch(
    err => errfunc(err)
  )
  return await response.data
}

async function getClasses() {
  const res = await Axios.post('/api/getclasses').catch(err => errfunc(err))
  return await res.data
}

async function updateClass(data) {
  const res = await Axios.post('/api/updateclass', { data }).catch(err =>
    errfunc(err)
  )
  return await res.data
}

async function deleteClass(data) {
  const res = await Axios.post('/api/deleteclass', { data }).catch(err =>
    errfunc(err)
  )
  return await res.data
}

async function getModuleOptions() {
  const res = await Axios.post('/api/getmoduleoptions').catch(err => errfunc(err))
  return await res.data
}

export {
  getProfileInfo,
  isLoggedIn,
  createNewClass,
  getClasses,
  updateClass,
  deleteClass,
  getModuleOptions
}
