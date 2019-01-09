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
      members: []
    }
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getMembers(this.props.ownedClass._id);
  }

  getMembers(classId) {
      fetch('/react/getmembers/' + classId)
        .then((response) => response.json())
        .then((json) => {
          this.setState(() => {
            return {members: json.members};
          });
        });
  }

   onClick() {
    console.log(this.props.ownedClass);
    this.props.reportClassClick(this.props.ownedClass);
    this.setState((prevState) => {
      return {isOpen: !prevState.isOpen}
    });
    this.getMembers(this.props.ownedClass._id);
  }

  render() {
    return(
      <div>
        <button id={this.getClassNameId()} key={this.props.ownedClass._id} onClick={this.onClick}> {this.props.label} </button>
        {this.renderStudents()}
      </div>
    );
  }

  renderStudents() {
    if(this.state.isOpen) {
      return (
        <ul className="sub-vertical">
          {this.state.members.map((member) => (
            <button key={member._id}> {member.username} </button>
          ))}
        </ul>
      );
    }
  }

  getClassNameId() {
    var isActive = (this.props.ownedClass._id == this.props.mostRecentClass()._id);

    if(isActive) {
      return "active"
    }
    else return "inactive";
  }
}

class ClassList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.ownedClass) {
      console.log(this.props.ownedClass.className + ' ');
    }
    return (
      <ul className="vertical">
        {this.props.classes.map((ownedClass) => (
          <ClassListElement reportClassClick={this.props.reportClassClick}
          ownedClass={ownedClass} label={ownedClass.className} key={ownedClass._id} mostRecentClass={this.props.mostRecentClass} >
           {ownedClass.className} </ClassListElement>
        ))}
      </ul>
    );
  }
}

class StudentListElement extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

  }
  render() {
    return(
      <div>
        <button onClick={this.onClick} key={this.props.person._id}> {this.props.label} </button>
      </div>
    );
  }

   onClick() {
     this.props.reportPersonClick(this.props.person)
   }
}

class StudentList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className="vertical">
        {this.props.people.map((person) => (
          <StudentListElement person={person} reportPersonClick={this.props.reportPersonClick}
          label={person.username} key={person._id} > {person.username} </StudentListElement>
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
      text: ' ',
      mostRecentClass: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.reportClassClick = this.reportClassClick.bind(this);
    this.reportPersonClick = this.reportPersonClick.bind(this);
    this.getMostRecentClass = this.getMostRecentClass.bind(this);
  }

  componentDidMount() {
    fetch('/react/userinfo')
      	.then((response) => response.json())
        .then((userJson) => {
          this.setState(() => {return {
            classes: userJson.classes,
            mostRecentClass: userJson.classes[0]
          }});
        }
    );

    fetch('/react/peopleinfo')
      	.then((response) => response.json())
        .then((peopleJson) => this.setState(() => {
          return {people: peopleJson.people};
    }));
  }

  render() {
    if(this.state.mostRecentClass) {
      console.log(this.state.mostRecentClass.className + 'selected class');

    }
    return(
      <div id="CreateClassGUI">
        <div className="leftbar">
          <h3>Classes</h3>
          <ClassList reportClassClick={this.reportClassClick} classes={this.state.classes} mostRecentClass={this.getMostRecentClass}/>
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
          <StudentList reportPersonClick={this.reportPersonClick} people={this.state.people}/>
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

//this is propagated down to the classListElements
  reportClassClick(ownedClass) {
    console.log(ownedClass);
    this.setState((prevState) => {
      return {mostRecentClass: ownedClass}
    });
  }

  getMostRecentClass() {
    return this.state.mostRecentClass;
  }

  reportPersonClick(person) {
    console.log('person clicked');
    const data = JSON.stringify({
      classID: this.state.mostRecentClass._id,
      personID: person._id
    });
    fetch('/profile/addstudent', {
      method: 'POST',
      body: data,
    }).then(() => {
      this.forceUpdate();
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
