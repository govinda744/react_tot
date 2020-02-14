import React, { Component } from 'react'

export class Home extends Component {

  getStyle = value => {
    if (value.completed) {
      return {textDecoration: 'line-through'};
    } else {
      return {};
    }
  }

  render() {
    const { todos, changeTodoStatus, addTodo, searchItem } = this.props;
    return (
      <div>
        <div className='fieldInput'>
          <input type='text' placeholder='search' defaultValue='' onChange={(e) => searchItem(e.target.value)} />
        </div>
        <div className='fieldInput'>
          <input type='text' placeholder='Add todo' defaultValue='' onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo(e.target.value);
              e.target.value = '';
            }
          }} />
        </div>
        <hr />
        <div>
          <ul>
            {todos.length === 0 ? 
            <li key='0' style={{lineHeight: '100px'}}>No remaining todo</li> :
            todos.map((value, index) => <li style={this.getStyle(value)} key={index} onClick={() => changeTodoStatus(value.id)}> {index + 1 + '. '+value.title}</li>)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
