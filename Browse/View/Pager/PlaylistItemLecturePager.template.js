import React from 'react';
import {withRouter} from 'decorators';
import {Pager} from 'components';
import {generateUrl} from 'utils';


@withRouter
export default class PlaylistItemLecturePager extends React.Component {

  render() {
    const {lecture} = this.props;
    return (
      <Pager title={lecture.name}
             prevOnClick={this.goToPrevLecture.bind(this)} prevDisabled={this.getPrevDisabled()}
             nextOnClick={this.goToNextLecture.bind(this)} nextDisabled={this.getNextDisabled()}
      />
    )
  }

  goToPrevLecture() {
    const {playlist, lecture, history} = this.props;
    const lectureIds = playlist.lectures.map(i=>i.id);
    const lectureIndex = lectureIds.indexOf(lecture.id);
    const prevLecture = playlist.lectures[lectureIndex - 1];
    history.push(generateUrl({name: 'PlaylistView', params: {playlistId: playlist.playlistId, lectureId: prevLecture.id}}));
  }

  getPrevDisabled() {
    const {playlist, lecture} = this.props;
    const lectureIds = playlist.lectures.map(i=>i.id);
    const lectureIndex = lectureIds.indexOf(lecture.id);
    return lectureIndex === 0;
  }

  goToNextLecture() {
    const {playlist, lecture, history} = this.props;
    const lectureIds = playlist.lectures.map(i=>i.id);
    const lectureIndex = lectureIds.indexOf(lecture.id);
    const nextLecture = playlist.lectures[lectureIndex + 1];
    history.push(generateUrl({name: 'PlaylistView', params: {playlistId: playlist.playlistId, lectureId: nextLecture.id}}));
  }

  getNextDisabled() {
    const {playlist, lecture} = this.props;
    const lectureIds = playlist.lectures.map(i=>i.id);
    const lectureIndex = lectureIds.indexOf(lecture.id);
    return lectureIndex === playlist.lectures.length - 1;
  }

}
