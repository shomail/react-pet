import React, { Component } from "react";
import pf from "petfinder-client";

const petfinder = pf();

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    const data = await petfinder.pet.get({
      output: "full",
      id: this.props.id
    });
    this.setState({
      name: data.petfinder.pet.name,
      animal: data.petfinder.pet.animal,
      location: `${data.petfinder.pet.contact.city} - ${
        data.petfinder.pet.contact.state
      }`,
      description: data.petfinder.pet.description,
      media: data.petfinder.pet.media,
      breed: data.petfinder.pet.breeds.breed,
      loading: false
    });
  }
  render() {
    if (this.state.loading) return <h1>Loading...</h1>;

    const { animal, breed, location, description, name } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;