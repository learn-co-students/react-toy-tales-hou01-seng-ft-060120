import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy => <ToyCard  deleteToy={props.deleteToy} key={toy.id} toy={toy}/>)}
    </div>
  );
}

export default ToyContainer;
