import axios from 'axios';


/**
 * Get First Playlist id
 */
export function getFirstItemIdAPI() {
  return axios({
    method: 'GET',
    url: '/v2/playlist/getFirstId'
  })
}


/**
 * List
 */
export function getListAPI() {
  return axios({
    method: 'GET',
    url: '/v2/playlist'
  })
}

/**
* New Playlist
*/
export function newItemAPI(values) {
  return axios({
    method: 'POST',
    url: '/v2/playlist',
    data: values
  })
}

/**
* Remove Playlist
*/
export function deletePlaylistAPI(playlistId) {
   return axios({
     method: 'DELETE',
     url: `/v2/playlist/${playlistId}`
   })
}

/**
* Remove Item From Playlist
*/
export function removeLectureFromPlaylistAPI(playlistId, lectureId) {
  return axios({
    method: 'DELETE',
    url: `/v2/playlist/${playlistId}/lectures`,
    data: {
      'lectureId': lectureId
    }
  })
}

/**
* Add Item To Playlist
*/
export function addLectureToPlaylistAPI(playlistId, lectureId) {
  return axios({
    method: 'PUT',
    url: `/v2/playlist/${playlistId}/lectures`,
    data: {
      'lectureId': lectureId
    }
  })
}

/**
* Item
*/
export function getItemAPI(playlistId) {
   return axios({
     method: 'GET',
     url: `/v2/playlist/${playlistId}`
   })
}

/**
* Playlists by lecture id
*/
export function getPlaylistsByLectureAPI(lectureId) {
   return axios({
     method: 'GET',
     url: `/v2/playlist?lectureId=${lectureId}`
   })
}
