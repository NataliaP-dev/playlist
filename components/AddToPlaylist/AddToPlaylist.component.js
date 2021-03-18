import React from 'react';
import {connect} from 'decorators';
import {Button, Check, NoContent} from 'components';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import {getPlaylistsByLecture, addLectureToPlaylist, removeLectureFromPlaylist} from '../../Playlist.actions';
import './AddToPlaylist.scss';


@connect((state, {lectureId}) => ({
  list: state.playlist.listByIdMap[lectureId],
  loading: state.playlist.loading
}), {
  getPlaylistsByLecture,
  addLectureToPlaylist,
  removeLectureFromPlaylist
})
export default class AddToPlaylist extends React.Component {

  render() {
    const {list, loading} = this.props;

    const addToPlaylist = (
      <Popover id="popover-positioned-left" className="AddToPlaylist_Popover">
        {!list && loading ? (
          <div className="AddToPlaylist_Loader">
            <div className="icon-spin icon-spinner"/>
          </div>
        ) : list && !!list.length ? (
          <ul className="AddToPlaylist_List">
          {list.map((item, k) => (
            <li key={k} className="AddToPlaylist_ListItem">
              <Check onChange={(value) => this.onCheck(value, item.playlistId)} value={item.playlistInLecture} label={item.name} />
            </li>
          ))}
          </ul>
        ) : (
          <NoContent />
        )}
      </Popover>
    );

    return (
      <div className="AddToPlaylist">
        <OverlayTrigger shouldUpdatePosition onEnter={this.getList.bind(this)} trigger="click" placement="left" overlay={addToPlaylist} rootClose={true}>
          <Button line size="Small" color="Primary" icon="icon-plus"
                  label={{id: 'Playlist.add'}}/>
        </OverlayTrigger>
      </div>
    )
  }

  getList() {
    const {lectureId, getPlaylistsByLecture} = this.props;
    const {list} = this.props;

    if (!list) {
      getPlaylistsByLecture(lectureId);
    }
  }

  onCheck(value, playlistId) {
    const {removeLectureFromPlaylist, addLectureToPlaylist, lectureId} = this.props;

    if (!value.target.checked) {
      removeLectureFromPlaylist(playlistId, lectureId);
    } else {
      addLectureToPlaylist(playlistId, lectureId);
    }
  }

}
