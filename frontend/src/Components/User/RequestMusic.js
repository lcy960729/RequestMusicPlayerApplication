import React from 'react';
import MusicList from './MusicList'
import axios from "axios";

class RequestMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            searchStr: '',
            musicItems: [{title: 'Phum Viphurit &amp; Higher Brothers - Lover Boy 88 (Official Video)', videoId : '31tpqyCJ0lI', thumbnailUrl: 'https://i.ytimg.com/vi/31tpqyCJ0lI/default.jpg'}],
            isLoading: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                {this.state.isLoading ? (
                    <div className="loader">
                        <span className="loader__text">Loading...</span>
                    </div>
                ) : (
                        <MusicList musicItems={this.state.musicItems} />
                    )}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        검색해주세요~
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Search
                    </button>
                </form>
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

}
export default RequestMusic;