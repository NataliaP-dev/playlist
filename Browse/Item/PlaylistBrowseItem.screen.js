import React from 'react';
import {resolveData, connect} from 'decorators';
import {getItem, deletePlaylist, removeLectureFromPlaylist} from '../../Playlist.actions';
import {NoContent} from 'components';
import {generateUrl} from 'utils';
import {openConfirmation} from 'services';
import history from '../../../../core/App/config/history';
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem.component';
import PlaylistHeading from '../PlaylistHeading/PlaylistHeading.template';
import './PlaylistBrowseItem.scss';


@resolveData(({match: {params: {playlistId}}}) => ([
  {action: () => getItem(playlistId), state: `playlist.itemMap['${playlistId}']`, cache: true}
]))
@connect((state, {match: {params: {playlistId}}}) => ({
  playlistItem: state.playlist.itemMap[playlistId]
}), {
  deletePlaylist,
  removeLectureFromPlaylist
})
export default class PlaylistBrowseItem extends React.Component {

  render() {
    const {playlistItem, match: {params: {playlistId}}} = this.props;

    return (
      <div className="PlaylistBrowseItem">
        <PlaylistHeading item={playlistItem} activeId={playlistId} onRemove={this.onRemovePlaylist.bind(this)} />
        {playlistItem.lectures && playlistItem.lectures.length > 0 ? playlistItem.lectures.map((item, k) => (
          <PlaylistItem item={item} key={k} onRemoveItem={this.onRemoveItem.bind(this)} playlistId={playlistId}  />
        )) : (
          <NoContent/>
        )}
      </div>
    )
  }

  onRemoveItem (playlistID, lectureId) {
    const {removeLectureFromPlaylist} = this.props;
    removeLectureFromPlaylist(playlistID, lectureId);
  }

  onRemovePlaylist(playlistID) {
    const {deletePlaylist} = this.props;
    openConfirmation({title: {id: 'PlaylistBrowseItem.removePopTitle'}, content: {id: 'PlaylistBrowseItem.removePopText'}}, () => {
      deletePlaylist(playlistID).then(() => {
        history.push(generateUrl({name: 'PlaylistBrowse'}));
      });
    });
  }
}
