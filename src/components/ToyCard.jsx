import React, { Component } from 'react';

const toyURL = 'http://localhost:3000/toys'

class ToyCard extends Component {
  
  state = {likes: this.props.toy.likes}
  

  likeToy = (toy) => {
    let likes = toy.likes += 1
    fetch(`${toyURL}/${toy.id}`, {
      method: 'PATCH',
      headers: {'Content-type': "application/json"},
      body: JSON.stringify({
        likes
      })
    }).then(resp => resp.json())
      .then(toy => this.setState({ likes }))
  }

  render() {
    const toy = this.props.toy
    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{toy.likes} Likes </p>
        <button onClick={() => {this.likeToy(toy)}} className="like-btn">Like {'<3'}</button>
        <button onClick={() => {this.props.deleteToy(toy.id)}} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
