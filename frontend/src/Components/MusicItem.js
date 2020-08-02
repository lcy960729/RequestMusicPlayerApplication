import React from "react";
import PropTypes from "prop-types";
import {ListGroupItem, Button} from 'reactstrap';

class MusicItem extends React.Component {
    handleSelectMusic = (e) => {
        e.preventDefault();
        this.props.onClickItem(this.props);
    }

    render() {
        return (
            <ListGroupItem tag="button" action style={listStyle} onClick={this.handleSelectMusic}>
                <div className="musicItem">
                    <img className="thumbnail" src={this.props.thumbnailUrl} alt={this.props.title}/>
                    <p>{this.props.title}</p>
                </div>
            </ListGroupItem>
        );
    }
}

MusicItem.propTypes = {
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    //requester: PropTypes.string.isRequired
};

const listStyle = {
    display: "inline-block"
}

export default MusicItem;
