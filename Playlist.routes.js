import Playlist from './Playlist.layout';
import PlaylistBrowse from './Browse/PlaylistBrowse.screen';
import PlaylistBrowseItem from './Browse/Item/PlaylistBrowseItem.screen';
import PlaylistBrowseRoot from './Browse/Root/PlaylistBrowseRoot.screen';
import PlaylistLectureView from './Browse/View/PlaylistItemLecture.screen';


export default {
  path: '/playlists',
  component: Playlist,
  name: 'Playlist',
  routes: [
    {
      name: 'PlaylistView',
      component: PlaylistLectureView,
      path: '/:playlistId/:lectureId',
      getRouteIntlValues: ({state, match}) => {
        const lectureList = state.playlist.itemMap[match.params.playlistId].lectures.filter(function(item) {
          return item.id === parseInt(match.params.lectureId);
        });
        return {
          playlistName: state.playlist.itemMap[match.params.playlistId].name,
          lectureName: lectureList.length && lectureList[0].title
        };
      }
    },
    {
      name: 'PlaylistBrowse',
      component: PlaylistBrowse,
      routes: [
        {
          path: '/:playlistId',
          name: 'PlaylistBrowseItem',
          component: PlaylistBrowseItem,
          getRouteIntlValues: ({state, match}) => ({name: state.playlist.itemMap[match.params.playlistId].name})
        },
        {
          path: '**',
          name: 'PlaylistBrowseRoot',
          component: PlaylistBrowseRoot
        }
      ]
    }
  ]
}
