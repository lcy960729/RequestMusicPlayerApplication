import React from 'react';
import MusicList from './MusicList'
import axios from "axios";
import { Collapse, Button, Spinner } from 'reactstrap';

class RequestMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            searchStr: '',
            musicItems: [{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'},{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'}],
            isLoading: false,
            isOpen:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.selectedMusic = {
            title: '',
            videoId: '',
            thumbnailUrl: '',
            requester: '',
        };
    }

    render() {
        const {isOpen} = this.state;

        const toggle = () => this.setState({
            isOpen:!isOpen
        })

        return (
            <div align='center' className={"content"} >
                <Button className={'menuBar'} color="primary" onClick={toggle}>음악 검색하기</Button>
                <Collapse isOpen={isOpen}>
                    <form className='searchMusic' onSubmit={this.handleSubmit} >
                        <input className={'searchTextBox'}
                            onChange={this.handleChange}
                            value={this.state.text}
                        />
                        <button className={'searchBtn'}>
                            S
                        </button>
                    </form>
                    {this.state.isLoading ?
                        <Spinner className={"musicListContent"} color="primary"  /> :
                        <MusicList musicItems={this.state.musicItems} onClickItem={this.onClickItem}/>}

                        <form className={"requestMusic"} onSubmit={this.handleAddMusicSubmit}>
                            <Button className={"requestMusicBtn"}>
                                    음악 신청하기
                            </Button>
                        </form>
                </Collapse>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        this.setState({ musicItems: [], isLoading: true });
        this.searchMusic();
    }

    onClickItem = (props) => {
        this.selectedMusic.title = props.title;
        this.selectedMusic.videoId = props.videoId;
        this.selectedMusic.thumbnailUrl = props.thumbnailUrl;
        console.log(this.selectedMusic);
    }

    handleAddMusicSubmit= (e) => {
        e.preventDefault();
        this.addMusic();
    }

    searchMusic = async () => {
        let url = '/api/getMusicList';
        let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                'search': this.state.text
            }
        };
        let response = await axios(options);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if (responseOK) {
            let data = await response.data;
            this.setState({ musicItems: data, isLoading: false })
        }
    };

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
export default RequestMusic;