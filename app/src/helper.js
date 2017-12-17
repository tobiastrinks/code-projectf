import axios from 'axios'

export class helper {
  static getCookie (cookieStr) {
    let name = cookieStr + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return false
  }
  static getButton (profileProjects, projectId) {
    const relations = ['owner', 'member', 'liked']
    let button = 'like'
    for (let x = 0; x < relations.length; x++) {
      if (profileProjects[relations[x]]) {
        for (let y = 0; y < profileProjects[relations[x]].length; y++) {
          if (projectId === profileProjects[relations[x]][y]) {
            if (relations[x] === 'owner') {
              button = 'edit'
            } else if (relations[x] === 'member') {
              button = 'member'
            } else if (relations[x] === 'liked') {
              button = 'liked'
            }
          }
        }
      }
    }
    return button
  }
  static likeButton (profile, projectId) {
    // check if already liked
    let liked = false
    let profileLiked = profile.projects.liked
    if (profileLiked) {
      for (let x = 0; x < profileLiked.length; x++) {
        if (profileLiked[x] === projectId) {
          liked = true
          profileLiked.splice(x, 1)
        }
      }
    }
    if (liked) {
      http.request('post', '/project/relation/delete', {
        project_id: projectId,
        user_id: profile.ID
      }, function (result) {
        console.log(result)
      })
    } else {
      if (!profileLiked) {
        profileLiked = [projectId]
      } else {
        profileLiked.push(projectId)
      }
      http.request('post', '/project/relation/create', {
        project_id: projectId,
        user_id: profile.ID,
        relation: 'liked'
      }, function (result) {
        console.log(result)
      })
    }
    return (profileLiked)
  }
}
export class http {
  static request (method, url, params, callback) {
    const HTTP = axios.create({
      baseURL: 'https://projectf-api.ttrks.de'
    })
    let config = {
      headers: {
        'Accept': 'application/json'
      }
    }
    let loginToken = helper.getCookie('token')
    if (loginToken) {
      config.headers.Authorization = loginToken
    }

    if (method === 'get') {
      HTTP.get(url, config).then(function (response) {
        callback(response.data)
      })
      .catch(function (e) {
        console.log('error: ' + e)
      })
    }
    if (method === 'post') {
      HTTP.post(url, params, config).then(function (response) {
        callback(response.data)
      })
      .catch(function (e) {
        console.log('error: ' + e)
      })
    }
  }
}
