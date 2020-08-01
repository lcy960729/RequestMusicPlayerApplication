import React from 'react';
import MusicItem from "../MusicItem";
import axios from "axios";

class MusicList extends React.Component {
    constructor(){
        super();
        this.state = {
        };

        this.selectedMusic = {
            title: '',
            videoId: '',
            thumbnailUrl: '',
            requester: '',
        };
    }

    render() {
        return (
            <section className="container">
                <ul className="musicItems">
                    {this.props.musicItems.map(musicItem => (
                        <MusicItem 
                            onClickItem={this.onClickItem}
                            key={musicItem.videoId}
                            title={musicItem.title}
                            videoId={musicItem.videoId}
                            thumbnailUrl={musicItem.thumbnailUrl}
                        />
                    ))}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <button>
                    음악 신청하기
                    </button>
                </form>
            </section>
        );
    }

    handleSubmit= (e) => {
        e.preventDefault();
        this.addMusic();
    }

    onClickItem = (props) => {
        this.selectedMusic.title = props.title;
        this.selectedMusic.videoId = props.videoId;
        this.selectedMusic.thumbnailUrl = props.thumbnailUrl;
        console.log(this.selectedMusic);
    }

    addMusic = async () => {
        let url = '/api/addMusic';
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                'music': this.selectedMusic,
            }
        };
        let response = await axios(options);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if (responseOK) {
            let data = await response.data;
            if (data === true)
                console.log("신청 완료");
        }
    };
}
export default MusicList;