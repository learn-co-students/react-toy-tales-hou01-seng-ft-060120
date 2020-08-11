import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

// import data from './data'

const TOYS_URL = "http://localhost:3000/toys";


class App extends React.Component{

  state = {
    display: false,
    toys: [],
  }

  componentDidMount() {
    fetch(TOYS_URL)
      .then(res => res.json())
      .then(toys => {
        this.setState({ toys })
      })
  }

  handleDisplayForm = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleToyForm = (e, formData) => {
    e.preventDefault();
    const toy = {...formData, likes: 0}

    fetch(TOYS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    }).then(res => res.json())
      .then(toy => {
        const toys = [ ...this.state.toys, toy ]
        this.setState({ toys })
        this.handleDisplayForm()
      })
  }

  handleLikeBtn = (id) => {
    let likes;
    const toys = this.state.toys.map(toy => {
      const newToy = { ...toy }

      if (newToy.id === id) {
        newToy.likes++;
        likes = newToy.likes;
      }

      return newToy;
    });

    this.setState({ toys })

    fetch(`${TOYS_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ likes })
    })
  }

  handleDonateBtn = (id) => {
    const toys = this.state.toys.filter(toy => toy.id !== id)
    this.setState({ toys })

    fetch(`${TOYS_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
  }

  render(){
    return (
      <>
        <Header/>

        { this.state.display
            ?
          <ToyForm handleToyForm={this.handleToyForm} />
            :
          null
        }

        <div className="buttonContainer">
          <button onClick={this.handleDisplayForm}> Add a Toy </button>
        </div>

        <ToyContainer
          toys={this.state.toys}
          handleLikeBtn={this.handleLikeBtn}
          handleDonateBtn={this.handleDonateBtn}
        />
      </>
    );
  }

}

export default App;
