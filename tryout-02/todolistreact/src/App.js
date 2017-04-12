import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ''};
  }

  render() {
    return (
      <div className="BackCenter">
        <h3>TODO LIST</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input
            className="input"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button className="inputSubmit">
            {'Add TODO ' + (this.state.items.length + 1)}
          </button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    axios.get('http://localhost:3001/').then(res => {
      console.log('================================', res);
      this.setState({
        items: res.data,
      });
    });
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now(),
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: '',
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    );
  }
}
