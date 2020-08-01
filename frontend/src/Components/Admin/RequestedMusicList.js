import React from 'react';
import MusicItem from '../MusicItem'
import axios from "axios";

const URL = 'ws://localhost:9322/ws/notification'

class RequestedMusicList extends React.Component {
    constructor() {
        super();
        this.selectedMusic = {
            videoId: '',
            order: '',
        };

        this.state = {
            requestedMusicList: [],
            isConnect: false,
        }
    }

    ws = new WebSocket(URL)

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            this.ws.send('connected')
            this.setState({ isConnect: true })
            this.addRequestedMusicList();
        }

        this.ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data)
            console.log("새로운 신청곡이 올라왔어요~");
            this.addMessage(message)
        }

        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(URL),
                isConnect: false,
            })
        }
    }

    addMessage = notificationMessage => {
        this.setState(state => ({ requestedMusicList: [notificationMessage.requestedMusic, ...state.requestedMusicList] }))
    }

    render() {
        if (this.props.isConnect)
            this.addRequestedMusicList();
        return (
            <section className="container">
                <ul className="musicItems">
                    {this.state.requestedMusicList.map(requestedMusic => (
                        <MusicItem
                            onClickItem={this.onClickItem}
                            key={requestedMusic.order}
                            order={requestedMusic.order}
                            title={requestedMusic.musicItem.title}
                            videoId={requestedMusic.musicItem.videoId}
                            thumbnailUrl={requestedMusic.musicItem.thumbnailUrl}
                            requester={requestedMusic.musicItem.requester}
                        />
                    ))}
                </ul>
                <button onClick={this.submitPlayBtn}>
                    음악 플레이
                    </button>

                <button onClick={this.submitDeleteBtn}>
                    삭제
                    </button>
            </section>
        );
    }

    addRequestedMusicList = async () => {
        let url = '/api/getRequestedMusicList';
        let options = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };
        let response = await axios(options);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if (responseOK) {
            let data = await response.data;
            this.setState({
                requestedMusicList: data
            });
        }
    };

    deleteRequestedMusicList = async () => {
        let url = '/api/deleteMusic';
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                'order': this.selectedMusic.order,
            }
        };
        let response = await axios(options);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if (responseOK) {
            let data = await response.data;
            if (data) {
                this.setState({
                    requestedMusicList: this.state.requestedMusicList.filter(item => {
                        return item.order !== this.selectedMusic.order;
                    })
                })
            }
        }

        this.selectedMusic = '';
    };


    submitPlayBtn = e => {
        this.props.handlePlayMusic(this.selectedMusic.videoId);
        this.deleteRequestedMusicList();
    }

    submitDeleteBtn = e => {
        this.deleteRequestedMusicList();
    }

    onClickItem = (musicItem) => {
        this.selectedMusic = {
            videoId: musicItem.videoId,
            order: musicItem.order
        }
        console.log(this.selectedMusic)
    }
}
export default RequestedMusicList;