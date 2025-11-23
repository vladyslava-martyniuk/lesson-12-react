import React, { Component } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 300px;
  position: relative;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid aqua;
  background: aqua;
  border-radius: 5px;
`;

class Modal extends Component {
  state = {
    isOpen: this.props.isOpen || false,
    secondsLeft: 10,
  };

  interval = null;

  handleKeyDown = (e) => {
    if (e.key === "Escape") this.close();
  };

  close = () => {
    this.setState({ isOpen: false });
    this.props.onClose?.();
    this.clearTimer();
  };

  startTimer = () => {
    this.clearTimer();

    if (this.state.isOpen) {
      this.setState({ secondsLeft: 10 });

      this.interval = setInterval(() => {
        this.setState((prev) => {
          if (prev.secondsLeft <= 1) {
            this.close();
            return { secondsLeft: 0 };
          }
          return { secondsLeft: prev.secondsLeft - 1 };
        });
      }, 1000);
    }
  };

  clearTimer = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    if (this.state.isOpen) this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: this.props.isOpen }, () => {
        if (this.props.isOpen) this.startTimer();
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.clearTimer();
  }

  render() {
    if (!this.state.isOpen) return null;

    return (
      <Overlay onClick={this.close}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <p>Таймер: {this.state.secondsLeft} сек</p>
          <h2>Модальне вікно</h2>
          <p>Це модальне вікно</p>
          <CloseButton onClick={this.close}>Закрити</CloseButton>
        </ModalBox>
      </Overlay>
    );
  }
}

export default Modal;
