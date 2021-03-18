import {getListAPI, getItemAPI, newItemAPI, deletePlaylistAPI, removeLectureFromPlaylistAPI, getPlaylistsByLectureAPI, addLectureToPlaylistAPI, getFirstItemIdAPI} from './Playlist.api';


/**
 * Get First Playlist Id
 */
export function getFirstItemId() {
  return {
    type: 'playlist/getFirstItemId',
    payload: getFirstItemIdAPI()
  }
}

/**
 * List
 */
export function getList() {
  return {
    type: 'playlist/getList',
    payload: getListAPI()
  }
}

/**
 * Item
 */
export function getItem(id) {
  return {
    type: 'playlist/getItem',
    payload: getItemAPI(id)
  }
}

/**
 * Playlist By Lecture Id
 */
export function getPlaylistsByLecture(lectureId) {
  return {
    type: 'playlist/getListsByLecture',
    payload: getPlaylistsByLectureAPI(lectureId),
    meta: {lectureId}
  }
}


/**
 * Create Playlist
 */
export function newPlaylist(params) {
  return {
    type: 'playlist/newPlaylist',
    payload: newItemAPI(params)
  }
}


/**
 * Remove Playlist
 */
export function deletePlaylist(playlistId) {
  return {
    type: 'playlist/deletePlaylist',
    payload: deletePlaylistAPI(playlistId),
    meta: {playlistId}
  }
}

/**
 * Remove Playlist Item
 */
export function removeLectureFromPlaylist(playlistId, lectureId) {
  return {
    type: 'playlist/removeLectureFromPlaylist',
    payload: removeLectureFromPlaylistAPI(playlistId, lectureId),
    meta: {playlistId, lectureId}
  }
}

/**
 * Add Playlist Item
 */
export function addLectureToPlaylist(playlistId, lectureId) {
  return {
    type: 'playlist/addLectureToPlaylist',
    payload: addLectureToPlaylistAPI(playlistId, lectureId),
    meta: {playlistId, lectureId}
  }
}
