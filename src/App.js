import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }
  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => this.setState({
      toys: json
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    }
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers:{
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(toy)
    }).then(res => res.json())
    .then(toy => {
      const newToyList = [...this.state.toys, toy]
      this.setState({
        toys: newToyList
        
      })
      this.handleClick()
    })
  }

  handleDelete = (deletedToy) => {
    fetch(`http://localhost:3000/toys/${deletedToy.id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      }
    })
    const currentToys = [...this.state.toys]
    const toyList = currentToys.filter(toy => toy.id !== deletedToy.id)
    this.setState({
      toys: toyList
    })

  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleDelete={this.handleDelete}/>
      </>
    );
  }

}

export default App;
