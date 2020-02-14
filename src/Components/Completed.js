import React, { Component } from 'react'

export class Completed extends Component {
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
            <li key='0' style={{lineHeight: '100px'}}>No completed todo</li> :
            todos.map((value, index) => {
              return (<li style={{textDecoration: 'line-through'}} key={index} onClick={() => changeTodoStatus(value.id)}>{index + 1 + '. '+value.title}</li>)
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Completed
