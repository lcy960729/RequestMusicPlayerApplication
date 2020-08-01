import React from 'react';
import YouTube from 'react-youtube';
 
class MusicPlayer extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    return <YouTube videoId={this.props.videoId} opts={opts} onEnd={this._onEnd} />;
}
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  _onEnd(event) {
    // access to player in all event handlers via event.target
    console.log("end");
  }
}

export default MusicPlayer;
