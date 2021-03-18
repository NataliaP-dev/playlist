import React from 'react';
import {ContentBox, CourseContentItem, NoContent, Link} from 'components';
import {classNames} from 'utils';
import './PlaylistViewSidebar.scss'


export default class PlaylistViewSidebar extends React.Component {

  render() {
    const {playlist, lectureId} = this.props;
    const playlistId = playlist.playlistId;

    return (
      <ContentBox className="PlaylistViewSidebar">
        <ul>
        {playlist.lectures && playlist.lectures.length > 0 ? playlist.lectures.map((lecture, k) => (
          <li key={k} className={classNames('PlaylistViewSidebar_Item', {'PlaylistViewSidebar_Item-Active': lecture.id === parseInt(lectureId)})}>
            <Link name="PlaylistView" params={{playlistId: playlistId, lectureId: lecture.id}}>
              <CourseContentItem type={'LECTURE'} lectureType={'VIDEO'} name={lecture.title} />
            </Link>
          </li>
        )) : (
          <NoContent/>
        )}
        </ul>
      </ContentBox>
    )
  }

}
