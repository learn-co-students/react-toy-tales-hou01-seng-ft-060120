import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    const toy = this.props.toy
    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button className="like-btn" onClick={() => this.props.handleLikeBtn(toy.id)}>Like ❤️</button>
        <button className="del-btn" onClick={() => this.props.handleDonateBtn(toy.id)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
