const initialState = {
  itemMap: {},
  listByIdMap: {}
};

export default function PlaylistReducer(state = initialState, action) {
  switch (action.type) {


    /**
     * Get First Playlists Id
     */
    case 'playlist/getFirstItemId_success': {
      return {
        ...state,
        firstItemId: action.payload.data
      };
    }

    /**
     * Get Playlists List
     */
    case 'playlist/getList_success': {
      return {
        ...state,
        list: action.payload.data
      };
    }

    /**
     * Get Playlists by LectureId List
     */
    case 'playlist/getListsByLecture_success': {
      return {
        ...state,
        listByIdMap: {
          ...state.listByIdMap,
          [action.meta.lectureId]: action.payload.data
        }
      };
    }

    /**
     * Get Playlist Item
     */
    case 'playlist/getItem_success': {
      return {
        ...state,
        itemMap: {
          ...state.itemMap,
          [action.payload.data.playlistId]: action.payload.data
        }
      };
    }

    /**
     * Delete Playlist Item
     */
    case 'playlist/removeLectureFromPlaylist_success': {
      return {
        ...state,
        itemMap: {
          ...state.itemMap,
          [action.meta.playlistId]: state.itemMap[action.meta.playlistId] && {
            ...state.itemMap[action.meta.playlistId],
            lectures: state.itemMap[action.meta.playlistId].lectures.filter(item => item.id !== action.meta.lectureId)
          }
        },
        listByIdMap: state.listByIdMap.length > 0 ? {
          ...state.listByIdMap,
          [action.meta.lectureId]: state.listByIdMap[action.meta.lectureId].map(item => item.playlistId === action.meta.playlistId ? {...item, playlistInLecture: false} : item)
        } : state.listByIdMap
      }
    }

    /**
     * Add Playlist Item
     */
    case 'playlist/addLectureToPlaylist_success': {
      return {
        ...state,
        listByIdMap: {
          ...state.listByIdMap,
          [action.meta.lectureId]: state.listByIdMap[action.meta.lectureId].map(item => item.playlistId === action.meta.playlistId ? {...item, playlistInLecture: true} : item)
        }
      }
    }

    /**
     * Create Playlist
     */
    case 'playlist/newPlaylist_success': {
      return {
        ...state,
        list: [
          ...state.list,
          action.payload.data
        ],
        listByIdMap: {}
      }
    }

    /**
     * Delete Playlist
     */
    case 'playlist/deletePlaylist_success': {
      return {
        ...state,
        list: state.list.filter(item => item.playlistId !== action.meta.playlistId)
      };
    }


    /**
     * Logout
     */
    case 'security/logout': {
      return initialState;
    }


    default: {
      return state;
    }
  }
}
