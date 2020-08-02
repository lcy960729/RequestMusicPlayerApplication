import React from 'react';
import MusicItem from "../MusicItem";
import { ListGroup } from 'reactstrap';

class MusicList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <section className="musicListContent" style={{ width: '100%', height: '80%', overflowY: 'scroll'}}>
                    <ListGroup className="musicItems">
                        {this.props.musicItems.map(musicItem => (
                            <MusicItem
                                onClickItem={this.props.onClickItem}
                                key={musicItem.videoId}
                                title={musicItem.title}
                                videoId={musicItem.videoId}
                                thumbnailUrl={musicItem.thumbnailUrl}
                            />
                        ))}
                    </ListGroup>
            </section>
        );
    }
}
export default MusicList;