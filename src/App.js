import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Home from './Components/Home';
import Completed from './Components/Completed';
import Remaining from './Components/Remaining';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      searchText: '',
      todos: []
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {return response.json()})
    .then((data) => this.setState({
      todos : data
    }));
  }

  getTodoList() {
    fetch()
  }

  filterItems = (items = [], serachText = '') => items.filter(item => item.title.includes(serachText))

  completedTodos() {
    return this.filterItems(this.state.todos, this.state.searchText).filter((value) => value.completed);
  }

  remainingTodos() {
    return this.filterItems(this.state.todos, this.state.searchText).filter((value) => !value.completed);
  }


  addTodo = todoTitle => {
    if (todoTitle !== '') {
      this.setState({
        todos: [...this.state.todos, {
          id: this.state.todos.length + 1,
          title: todoTitle,
          completed: false
        }]
      });
    }
  }

  changeTodoStatus = id => {
    this.setState(
      {
        todos: this.state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
          }
          return todo;
        })
      }
    );
  }

  searchItem = searchText => {
    this.setState({ searchText });
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <header>
            <ul>
              <li onClick={() => this.searchItem('')}>
                <NavLink activeClassName='' to='/'><img src='https://pngimage.net/wp-content/uploads/2018/06/todo-png-5.png' alt='icon'></img></NavLink>
              </li>
              <li onClick={() => this.searchItem('')}>
                <NavLink exact={true} activeClassName='is-active' to='/'>Home</NavLink>
              </li>
              <li onClick={() => this.searchItem('')}>
                <NavLink activeClassName='is-active' to='/completed'>Completed</NavLink>
              </li>
              <li onClick={() => this.searchItem('')}>
                <NavLink activeClassName='is-active' to='/remaining'>Remainig</NavLink>
              </li>
            </ul>
          </header>

          <Switch>
            <Route exact path='/'>
              <Home todos={this.filterItems(this.state.todos, this.state.searchText)} addTodo={this.addTodo} changeTodoStatus={this.changeTodoStatus} searchItem={this.searchItem} />
            </Route>
            <Route exact path='/completed'>
              <Completed todos={this.completedTodos()} addTodo={this.addTodo} changeTodoStatus={this.changeTodoStatus} searchItem={this.searchItem} />
            </Route>
            <Route exact path='/remaining'>
              <Remaining todos={this.remainingTodos()} addTodo={this.addTodo} changeTodoStatus={this.changeTodoStatus} searchItem={this.searchItem} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
