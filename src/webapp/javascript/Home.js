import React, { Component, Fragment} from 'react';

class TodoList extends Component {
	constructor(){
		super();
		this.state = {
			text: 'HOME!'
		};
	}
	render() {
		return (
			<div>hello,{this.state.text}!</div>
		);
	}
}

export default TodoList;
