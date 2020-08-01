import React from 'react';
import MusicPlayer from './MusicPlayer'
import RequestedMusicList from './RequestedMusicList'
import withLogin from '../LoginHOC';

class Admin extends React.Component {
    constructor() {
        super();

        this.state = {
            playMusic: '',
        }
    }

    handlePlayMusic = (videoId) => {
        this.setState({
            playMusic : videoId
        })
    }

    render() {
        return (
            <div>
                <MusicPlayer
                    onClose={() => {
                        this.setVideo();
                    }}
                    videoId={this.state.playMusic}
                />

                <RequestedMusicList handlePlayMusic={this.handlePlayMusic}/>
            </div>
        );
    }
}
export default withLogin(Admin);