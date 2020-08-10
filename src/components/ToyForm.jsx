import React, { Component } from 'react';

class ToyForm extends Component {
 

  handleSubmit = (e) => {
    e.preventDefault()
    let form = e.currentTarget
    console.log(e.target.name.value)
    let toy = ({
      name: e.target.name.value,
      image: e.target.image.value
    })
    this.props.addToy(toy)
    form.reset()
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input  type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
