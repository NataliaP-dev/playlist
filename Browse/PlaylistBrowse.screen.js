import React from 'react';
import {resolveData, connect} from 'decorators';
import {getList, newPlaylist} from '../Playlist.actions';
import {ContentLayout, ContentBox, Button, SidebarPlaylists, PageTitle} from 'components';
import CreatePlaylist from '../components/CreatePlaylist/CreatePlaylist.component';
import {renderChildRoutes} from 'utils';
import './PlaylistBrowse.scss';


@resolveData(() => ([
  {action: () => getList(), state: 'playlist.list', cache: true}
]))
@connect((state) => ({
  list: state.playlist.list
}), {
  newPlaylist
})
export default class PlaylistBrowse extends React.Component {

  state = {
    newPlaylistOpened: false,
    values: null
  };

  render() {
    const {newPlaylistOpened} = this.state;
    const {list} = this.props;

    return (
      <ContentLayout className="PlaylistBrowse"
                     header={<PageTitle label={{id: 'PlaylistBrowse.title'}}/>}
                     main={
                       <ContentBox>
                         {renderChildRoutes(this)}
                       </ContentBox>
                     }
                     sidebar={
                       <ContentBox>
                         {newPlaylistOpened ? (
                           <CreatePlaylist onSubmit={this.onSubmit.bind(this)} onCancel={this.changeCreatePlaylistStatus.bind(this)} />
                         ) : (
                           <div>
                             <SidebarPlaylists list={list}/>
                             <Button onClick={() => this.changeCreatePlaylistStatus(true)}
                                     size="Small" color="Primary" label={{id: 'PlaylistBrowse.newPlaylist.button'}} icon="icon-plus-circle"/>
                           </div>
                         )}
                       </ContentBox>
                     }
                     reverse
      />
    )
  }

  changeCreatePlaylistStatus(status) {
    this.setState({newPlaylistOpened: status});
    this.setState({values: null});
  }

  onSubmit(values) {
    const {newPlaylist} = this.props;
    newPlaylist(values).then(() => {this.changeCreatePlaylistStatus(false)});
  }
}
