'use strict';
'use-strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function TabHead(props) {
  return React.createElement(
    'button',
    { className: 'TabHead', onClick: props.onClick },
    ' ',
    props.value,
    ' '
  );
}

function Body(props) {
  if (props.value == 1) {
    return React.createElement(CreateClassGUI, null);
  }
  return React.createElement(
    'div',
    null,
    '  error '
  );
}

var ClassListElement = function (_React$Component) {
  _inherits(ClassListElement, _React$Component);

  function ClassListElement(props) {
    _classCallCheck(this, ClassListElement);

    var _this = _possibleConstructorReturn(this, (ClassListElement.__proto__ || Object.getPrototypeOf(ClassListElement)).call(this, props));

    _this.state = {
      isOpen: false,
      members: []
    };
    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(ClassListElement, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getMembers(this.props.ownedClass._id);
    }
  }, {
    key: 'getMembers',
    value: function getMembers(classId) {
      var _this2 = this;

      fetch('/react/getmembers/' + classId).then(function (response) {
        return response.json();
      }).then(function (json) {
        _this2.setState(function () {
          return { members: json.members };
        });
      });
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      console.log(this.props.ownedClass);
      this.props.reportClassClick(this.props.ownedClass);
      this.setState(function (prevState) {
        return { isOpen: !prevState.isOpen };
      });
      this.getMembers(this.props.ownedClass._id);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { id: this.getClassNameId(), key: this.props.ownedClass._id, onClick: this.onClick },
          ' ',
          this.props.label,
          ' '
        ),
        this.renderStudents()
      );
    }
  }, {
    key: 'renderStudents',
    value: function renderStudents() {
      if (this.state.isOpen) {
        return React.createElement(
          'ul',
          { className: 'sub-vertical' },
          this.state.members.map(function (member) {
            return React.createElement(
              'button',
              { key: member._id },
              ' ',
              member.username,
              ' '
            );
          })
        );
      }
    }
  }, {
    key: 'getClassNameId',
    value: function getClassNameId() {
      var isActive = this.props.ownedClass._id == this.props.mostRecentClass()._id;

      if (isActive) {
        return "active";
      } else return "inactive";
    }
  }]);

  return ClassListElement;
}(React.Component);

var ClassList = function (_React$Component2) {
  _inherits(ClassList, _React$Component2);

  function ClassList(props) {
    _classCallCheck(this, ClassList);

    return _possibleConstructorReturn(this, (ClassList.__proto__ || Object.getPrototypeOf(ClassList)).call(this, props));
  }

  _createClass(ClassList, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (this.props.ownedClass) {
        console.log(this.props.ownedClass.className + ' ');
      }
      return React.createElement(
        'ul',
        { className: 'vertical' },
        this.props.classes.map(function (ownedClass) {
          return React.createElement(
            ClassListElement,
            { reportClassClick: _this4.props.reportClassClick,
              ownedClass: ownedClass, label: ownedClass.className, key: ownedClass._id, mostRecentClass: _this4.props.mostRecentClass },
            ownedClass.className,
            ' '
          );
        })
      );
    }
  }]);

  return ClassList;
}(React.Component);

var StudentListElement = function (_React$Component3) {
  _inherits(StudentListElement, _React$Component3);

  function StudentListElement(props) {
    _classCallCheck(this, StudentListElement);

    var _this5 = _possibleConstructorReturn(this, (StudentListElement.__proto__ || Object.getPrototypeOf(StudentListElement)).call(this, props));

    _this5.onClick = _this5.onClick.bind(_this5);

    return _this5;
  }

  _createClass(StudentListElement, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: this.onClick, key: this.props.person._id },
          ' ',
          this.props.label,
          ' '
        )
      );
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      this.props.reportPersonClick(this.props.person);
    }
  }]);

  return StudentListElement;
}(React.Component);

var StudentList = function (_React$Component4) {
  _inherits(StudentList, _React$Component4);

  function StudentList(props) {
    _classCallCheck(this, StudentList);

    return _possibleConstructorReturn(this, (StudentList.__proto__ || Object.getPrototypeOf(StudentList)).call(this, props));
  }

  _createClass(StudentList, [{
    key: 'render',
    value: function render() {
      var _this7 = this;

      return React.createElement(
        'ul',
        { className: 'vertical' },
        this.props.people.map(function (person) {
          return React.createElement(
            StudentListElement,
            { person: person, reportPersonClick: _this7.props.reportPersonClick,
              label: person.username, key: person._id },
            ' ',
            person.username,
            ' '
          );
        })
      );
    }
  }]);

  return StudentList;
}(React.Component);

var CreateClassGUI = function (_React$Component5) {
  _inherits(CreateClassGUI, _React$Component5);

  function CreateClassGUI(props) {
    _classCallCheck(this, CreateClassGUI);

    var _this8 = _possibleConstructorReturn(this, (CreateClassGUI.__proto__ || Object.getPrototypeOf(CreateClassGUI)).call(this, props));
    //TODO in futute teachers should add as teachers and students as students


    _this8.state = {
      classes: [],
      people: [],
      text: ' ',
      mostRecentClass: null
    };
    _this8.handleChange = _this8.handleChange.bind(_this8);
    _this8.handleAdd = _this8.handleAdd.bind(_this8);
    _this8.reportClassClick = _this8.reportClassClick.bind(_this8);
    _this8.reportPersonClick = _this8.reportPersonClick.bind(_this8);
    _this8.getMostRecentClass = _this8.getMostRecentClass.bind(_this8);
    return _this8;
  }

  _createClass(CreateClassGUI, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this9 = this;

      fetch('/react/userinfo').then(function (response) {
        return response.json();
      }).then(function (userJson) {
        _this9.setState(function () {
          return {
            classes: userJson.classes,
            mostRecentClass: userJson.classes[0]
          };
        });
      });

      fetch('/react/peopleinfo').then(function (response) {
        return response.json();
      }).then(function (peopleJson) {
        return _this9.setState(function () {
          return { people: peopleJson.people };
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.mostRecentClass) {
        console.log(this.state.mostRecentClass.className + 'selected class');
      }
      return React.createElement(
        'div',
        { id: 'CreateClassGUI' },
        React.createElement(
          'div',
          { className: 'leftbar' },
          React.createElement(
            'h3',
            null,
            'Classes'
          ),
          React.createElement(ClassList, { reportClassClick: this.reportClassClick, classes: this.state.classes, mostRecentClass: this.getMostRecentClass }),
          React.createElement(
            'form',
            { onSubmit: this.handleAdd },
            React.createElement(
              'label',
              { htmlFor: 'new-class' },
              'Create Class'
            ),
            React.createElement('input', {
              id: 'new-class',
              onChange: this.handleChange,
              value: this.state.text
            }),
            React.createElement(
              'button',
              null,
              'Add #',
              this.state.classes.length + 1
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'rightbar' },
          React.createElement(
            'h3',
            null,
            ' Students '
          ),
          React.createElement(StudentList, { reportPersonClick: this.reportPersonClick, people: this.state.people })
        )
      );
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ text: e.target.value });
    }
  }, {
    key: 'handleAdd',
    value: function handleAdd(e) {
      e.preventDefault();
      if (!this.state.text.length) {
        return;
      }
      var data = JSON.stringify({
        classname: this.state.text,
        source: 'react'
      });
      var newClass = {
        className: this.state.text,
        _id: Date.now()
      };

      this.setState(function (prevState) {
        return {
          classes: prevState.classes.concat(newClass),
          text: ''
        };
      });
      fetch('/profile/createclass', {
        method: 'POST',
        body: data
      });
    }

    //this is propagated down to the classListElements

  }, {
    key: 'reportClassClick',
    value: function reportClassClick(ownedClass) {
      console.log(ownedClass);
      this.setState(function (prevState) {
        return { mostRecentClass: ownedClass };
      });
    }
  }, {
    key: 'getMostRecentClass',
    value: function getMostRecentClass() {
      return this.state.mostRecentClass;
    }
  }, {
    key: 'reportPersonClick',
    value: function reportPersonClick(person) {
      var _this10 = this;

      console.log('person clicked');
      var data = JSON.stringify({
        classID: this.state.mostRecentClass._id,
        personID: person._id
      });
      fetch('/profile/addstudent', {
        method: 'POST',
        body: data
      }).then(function () {
        _this10.forceUpdate();
      });
    }
  }]);

  return CreateClassGUI;
}(React.Component);

var CreateSkillsGUI = function (_React$Component6) {
  _inherits(CreateSkillsGUI, _React$Component6);

  function CreateSkillsGUI(props) {
    _classCallCheck(this, CreateSkillsGUI);

    return _possibleConstructorReturn(this, (CreateSkillsGUI.__proto__ || Object.getPrototypeOf(CreateSkillsGUI)).call(this, props));
  }

  _createClass(CreateSkillsGUI, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', { id: 'CreateSkillsGUI' });
    }
  }]);

  return CreateSkillsGUI;
}(React.Component);

var Main = function (_React$Component7) {
  _inherits(Main, _React$Component7);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this12 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this12.state = {
      tabs: 1
    };
    return _this12;
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      var _this13 = this;

      return React.createElement(
        'div',
        { id: 'biggrid' },
        React.createElement(
          'nav',
          null,
          React.createElement(
            'ul',
            null,
            React.createElement(TabHead, { value: "Create Class", onClick: function onClick() {
                return _this13.setState({ tabs: 1 });
              } }),
            React.createElement(TabHead, { value: "Create Skills", onClick: function onClick() {
                return _this13.setState({ tabs: 2 });
              } }),
            React.createElement(TabHead, { value: "Create Tree", onClick: function onClick() {
                return _this13.setState({ tabs: 3 });
              } })
          )
        ),
        React.createElement(Body, { value: this.state.tabs })
      );
    }
  }]);

  return Main;
}(React.Component);

var domContainer = document.querySelector('#react_container');

ReactDOM.render(React.createElement(Main, null), domContainer);
