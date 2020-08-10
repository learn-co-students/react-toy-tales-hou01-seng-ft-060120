import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const toyURL = 'http://localhost:3000/toys'

class App extends React.Component{
constructor(){
  super()
  this.state = {
    display: false,
    toys: [],
  }
}

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }
  
  componentDidMount(){
    fetch(toyURL)
    .then(resp => resp.json())
    .then(toys => this.setState({toys}))
  }

  addToy = (toy) => {
    fetch(toyURL, {
      method: 'POST',
      headers: {'Content-type': "application/json"},
      body: JSON.stringify({
        name: toy.name,
        image: toy.image,
        likes: 0,
      })
    }).then(resp => resp.json())
      .then(toy => this.setState({toys: [...this.state.toys,toy]}))
  }

  deleteToy = (id) => {
    fetch( `${toyURL}/${id}`, {
      method: "DELETE",
      headers: {'Content-type': "application/json"}
    })
      const toys = this.state.toys.filter(toy => toy.id !== id);
      this.setState({toys});
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer deleteToy={this.deleteToy} toys={this.state.toys}/>
      </>
    );
  }

}

export default App;
