'use-strict'

function TabHead(props) {
  return (
    <button className="TabHead" onClick={props.onClick}> {props.value} </button>
  );
}

function Body(props) {
    if(props.value == 1) {
      return(
        <CreateClassGUI/>
      );
    }
    return ( <div>  error </div>);
}


class ClassListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      students: ['Bobs', 'joe']
    }
    this.onClick = this.onClick.bind(this);
  }

  renderStudents() {
    if(this.state.isOpen) {
      return (
        <ul className="sub-vertical">
          {this.state.students.map((student) => (
            //replace with id when students become objectgs
            <button key={student.length}> {student} </button>
          ))}
        </ul>
      );
    }
  }

  render() {
    return(
      <div>
        <button key={this.props.ownedClass._id} onClick={this.onClick}> {this.props.label} </button>
        {this.renderStudents()}

      </div>
    );
  }

  onClick() {
    this.setState((prevState) => {
      return {isOpen: !prevState.isOpen}
    })
    console.log('staate switched to ' + this.state.isOpen)

  }


}

class ClassList extends React.Component {
  render() {
    return (
      <ul className="vertical">
        {this.props.classes.map((ownedClass) => (
          <ClassListElement ownedClass={ownedClass} label={ownedClass.className} key={ownedClass._id} > {ownedClass.className} </ClassListElement>
        ))}
      </ul>
    );
  }
}

class StudentList extends React.Component {
  render() {
    return (
      <ul className="vertical">
        {this.props.classes.map((ownedClass) => (
          <ClassListElement ownedClass={ownedClass} label={ownedClass.className} key={ownedClass._id} > {ownedClass.className} </ClassListElement>
        ))}
      </ul>
    );
  }
}
class CreateClassGUI extends React.Component {

  constructor(props) {
    //TODO in futute teachers should add as teachers and students as students
    super(props)
    this.state = {
      classes: [],
      people: [],
      text: ' '
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    fetch('/react/userinfo')
      	.then((response) => response.json())
        .then((userJson) => this.setState(() => {
          return {classes: userJson.classes};
    }));
    fetch('/react/peopleinfo')
      	.then((response) => response.json())
        .then((peopleJson) => this.setState(() => {
          return {people: peopleJson.people};
    }));
  }

  render() {
    return(
      <div id="CreateClassGUI">
        <div className="leftbar">
          <h3>Classes</h3>
          <ClassList classes={this.state.classes} />
          <form onSubmit={this.handleAdd}>
            <label htmlFor="new-class">
              Create Class
            </label>
            <input
              id="new-class"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button>
              Add #{this.state.classes.length + 1}
            </button>
          </form>
        </div>
        <div className="rightbar">
          <h3> Students </h3>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleAdd(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const data = JSON.stringify(  {
      classname: this.state.text,
      source: 'react'
    })
    const newClass = {
      className: this.state.text,
      _id: Date.now()
    };

    this.setState(prevState => ({
      classes: prevState.classes.concat(newClass),
      text: ''
    }));
    fetch('/profile/createclass', {
      method: 'POST',
      body: data,
    });
  }
}

class CreateSkillsGUI extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div id="CreateSkillsGUI">

      </div>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: 1
    }
  }
  render() {
    return (
      <div id="biggrid">
        <nav>
          <ul>
            <TabHead value={"Create Class"} onClick={() => this.setState({tabs: 1})} />
            <TabHead value={"Create Skills"} onClick={() => this.setState({tabs: 2})} />
            <TabHead value={"Create Tree"} onClick={() => this.setState({tabs: 3})} />
          </ul>
        </nav>
        <Body value={this.state.tabs}/>
      </div>
    );
  }
}

const domContainer = document.querySelector('#react_container');

ReactDOM.render(
  <Main />,
  domContainer
);
