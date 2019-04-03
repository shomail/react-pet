import React, { Component, lazy } from "react";
import pf from "petfinder-client";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

const Modal = lazy(() => import("./Modal"));

const petfinder = pf();

class Details extends Component {
  state = { loading: true, showModal: false };

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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) return <h1>Loading...</h1>;

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {theme => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme[0] }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
        {!showModal ? null : (
          <Modal>
            <div>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.toggleModal}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
