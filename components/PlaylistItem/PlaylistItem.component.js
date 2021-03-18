import React from 'react';
import {classNames} from 'utils';
import PropTypes from 'prop-types';
import {Intl, Link} from 'components';
import './PlaylistItem.scss';


export default class PlaylistItem extends React.Component {
  static propTypes = {
    showDuration: PropTypes.bool,
    showDescription: PropTypes.bool
  };

  render() {
    const {item, className, onRemoveItem, lectureId, playlistId} = this.props;

    return (
      <div className={classNames('PlaylistItem', className, {'PlaylistItem-Active': parseInt(lectureId) === item.id})}>
        <Link name="PlaylistView" className="PlaylistItem_Details" params={{playlistId: playlistId, lectureId: item.id}}>
          <div className="PlaylistItem_Title">{item.title}</div>
          <div className="PlaylistItem_Description">{item.description}</div>
        </Link>

        <div className="PlaylistItem_Duration">
          <Intl.span id="CourseItem.Duration" values={{value: item.duration}}/>
        </div>

        {onRemoveItem && (
          <div onClick={() => onRemoveItem(playlistId, item.id)} className="PlaylistItem_Action"/>
        )}
      </div>
    )
  }
}
