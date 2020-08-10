import React, { Component } from 'react';

class ToyCard extends Component {

  state = {
    likes : this.props.toy.likes
  }

  handleLikes = () => {
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        likes: this.state.likes +1
      }),
      
    })
    this.setState({
        likes: this.state.likes +1
      })
  }

  render() {
    const toy = this.props.toy
    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button className="like-btn" onClick={this.handleLikes}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.handleDelete(toy)} >Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
