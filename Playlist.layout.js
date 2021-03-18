import React from 'react';
import {renderChildRoutes} from 'utils';


export default class Playlist extends React.Component {
  render() {
    return renderChildRoutes(this);
  }
}
