# tryout-02

# Contributor
* Tyoaris21@gmail.com
* tyokusuma

# Lisensi
* tyokusuma@2017


# How to run

## Client

* directory using cd tryout/todolistreact
* Build react js with npm start
* this is front end to catch data of server or to do list from its array

```
  render() {
    return (
      <div className="BackCenter">
        <h3>TODO LIST</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add TODO ' + (this.state.items.length + 1)}</button>

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
```

## Server

* directory using cd tryout-02/server
* If you just clone this repository, you must install all dependencies using yarn install or npm install
* Run the server by executing node index.js

## Data server


```
var express = require('express');
var app = express();
var cors = require('cors');

var data = [
  {id: '1', text: 'To Do list from server 1'},
  {id: '2', text: 'TodoList from server 2'},
];

app.use(cors());

app.get('/', function(req, res) {
  res.send(data);
});

app.listen(3001, function() {
  console.log('example app port 3001!');
});
```


#NATIVE MODULE

