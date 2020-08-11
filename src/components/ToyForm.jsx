import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    "name": "",
    "image": ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={(e) => this.props.handleToyForm(e, this.state)} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter a toy's name..."
            className="input-text"
            onChange={this.handleChange}
          />
          <br/>
          <input
            type="text"
            name="image"
            placeholder="Enter a toy's image URL..."
            className="input-text"
            onChange={this.handleChange}
          />
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
