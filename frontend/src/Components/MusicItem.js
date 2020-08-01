
import React from "react";
import PropTypes from "prop-types";

class MusicItem extends React.Component {
    handleSelectMusic = (e) => {
        e.preventDefault();
        this.props.onClickItem(this.props);
    }

    render() {
        return (
            <li className="musicItem" onClick={this.handleSelectMusic}>
                <img src={this.props.thumbnailUrl} alt={this.props.title} />
                <div className="musicItem__data">
                    <h3 className="musicItem__title">{this.props.title}</h3>
                </div>
            </li>
        );
    }
}

MusicItem.propTypes = {
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    //requester: PropTypes.string.isRequired
};

export default MusicItem;
