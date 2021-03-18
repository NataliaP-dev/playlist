import React from 'react';
import {resolveData, connect} from 'decorators';
import {getItem} from '../../Playlist.actions';
import {ContentLayout, MediaViewer, ContentBox, PageTitle} from 'components';
import PlaylistViewSidebar from './Sidebar/PlaylistViewSidebar.template';
import {getLecture} from '../../../Course/Course.actions';
import './PlaylistItemLecture.scss'
import Pager from './Pager/PlaylistItemLecturePager.template';


@resolveData(({match: {params: {playlistId, lectureId}}}) => ([
  {action: () => getItem(playlistId), state: `playlist.itemMap['${playlistId}']`, cache: true},
  {action: () => getLecture({lectureId: lectureId}), state: `course.lectureMap[${lectureId}]`, cache: true}
]))
@connect((state, {match: {params: {playlistId, lectureId}}}) => {
  const lecture = state.course.lectureMap[lectureId];
  return {
    playlist: state.playlist.itemMap[playlistId],
    lecture,
    vimeoVideo: lecture && state.app.vimeoVideoMap[lecture.vimeoId]
  }
})
export default class PlaylistLectureView extends React.Component {

  render() {
    const {lectureId} = this.props.match.params;
    const {playlist, lecture, vimeoVideo} = this.props;

    return (
      <ContentLayout className="PlaylistLectureView" header={(
        <PageTitle label={playlist.name} />
      )} sidebar={(
        <PlaylistViewSidebar playlist={playlist} lectureId={lectureId} />
      )} main={(
        <ContentBox>
          <Pager playlist={playlist} lecture={lecture}/>
          <MediaViewer {...lecture} type={lecture.lectureType} vimeoVideo={vimeoVideo} />
        </ContentBox>
      )} reverse />
    )
  }

}
