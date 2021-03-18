import React from 'react';
import {InputField, Form, FormActions, ContentTitle} from 'components';
import {required} from 'services';
import './CreatePlaylist.scss';


export default class CreatePlaylist extends React.Component {
  formValidation = {
    name: [required],
    description: [required]
  };

  state = {values: null};

  render() {
    const {onSubmit, onCancel} = this.props;

    return (
        <Form name="NewPlaylistForm" onSubmit={onSubmit.bind(this)} validation={this.formValidation} className="CreatePlaylist" small>
          <ContentTitle label={{id: 'PlaylistBrowse.newPlaylist.title'}}/>
          <InputField name="name" type="text" label={{id: 'PlaylistBrowse.newPlaylist.titleLabel'}} />
          <InputField name="description" type="text" label={{id: 'PlaylistBrowse.newPlaylist.descriptionLabel'}} />
          <FormActions hideMessages onCancel={() => onCancel(false)} />
        </Form>
    )
  }
}
