import React from 'react';
import {Button} from 'components';
import './PlaylistHeading.scss';

export default class PlaylistHeading extends React.Component {
  render() {
    const {item, activeId, onRemove} = this.props;

    return (
      <div className="PlaylistHeading">
        <div className="PlaylistHeading_Details">
          <div className="PlaylistHeading_Title">
            {item.name}
          </div>
          <div className="PlaylistHeading_Description">
            {item.description}
          </div>
        </div>
        <Button onClick={() => onRemove(activeId)} size="Small" line icon="icon-close" label={{id: 'PlaylistBrowse.removePlaylist'}}/>
      </div>
    )
  }
}
