import React, { Component } from "react";
import Modal from "./components/Modal";

class App extends Component {
  state = { showModal: false };

  openModal = () => this.setState({ showModal: true });
  closeModal = () => this.setState({ showModal: false });

  render() {
    return (
      <div className="App">
        <button
          onClick={this.openModal}
          style={{
            padding: "10px 20px",
            backgroundColor: "pink",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Відкрити модальне вікно
        </button>

        <Modal isOpen={this.state.showModal} onClose={this.closeModal} />
      </div>
    );
  }
}

export default App;
