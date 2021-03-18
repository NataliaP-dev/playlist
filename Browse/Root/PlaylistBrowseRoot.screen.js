import React from 'react';
import {connect} from 'decorators';
import {Redirect, NoContent} from 'components';


@connect((state) => ({
  list: state.playlist.list
}))
export default class PlaylistBrowseRoot extends React.Component {

  render() {
    const {list} = this.props;
    if (list && list.length) {
      return <Redirect name="PlaylistBrowseItem" params={{playlistId: list[0].playlistId}}/>
    }
    return (
      <NoContent/>
    )
  }
}
