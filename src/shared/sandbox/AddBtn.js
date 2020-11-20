import React, { Component } from "react";

class AddBtn extends Component {
  render () {
    return (
    <button 
      id={this.props.id}
      className={this.props.className} 
      onClick={this.props.onClick}
    >
      <i class="fas fa-plus" ></i>
    </button>
    )
  }
}

export default AddBtn;
