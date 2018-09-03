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
      students: ['Bobs', 'joe']
    };
    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(ClassListElement, [{
    key: 'renderStudents',
    value: function renderStudents() {
      if (this.state.isOpen) {
        return React.createElement(
          'ul',
          { className: 'sub-vertical' },
          this.state.students.map(function (student) {
            return (
              //replace with id when students become objectgs
              React.createElement(
                'button',
                { key: student.length },
                ' ',
                student,
                ' '
              )
            );
          })
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { key: this.props.ownedClass._id, onClick: this.onClick },
          ' ',
          this.props.label,
          ' '
        ),
        this.renderStudents()
      );
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      this.setState(function (prevState) {
        return { isOpen: !prevState.isOpen };
      });
      console.log('staate switched to ' + this.state.isOpen);
    }
  }]);

  return ClassListElement;
}(React.Component);

var ClassList = function (_React$Component2) {
  _inherits(ClassList, _React$Component2);

  function ClassList() {
    _classCallCheck(this, ClassList);

    return _possibleConstructorReturn(this, (ClassList.__proto__ || Object.getPrototypeOf(ClassList)).apply(this, arguments));
  }

  _createClass(ClassList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'ul',
        { className: 'vertical' },
        this.props.classes.map(function (ownedClass) {
          return React.createElement(
            ClassListElement,
            { ownedClass: ownedClass, label: ownedClass.className, key: ownedClass._id },
            ' ',
            ownedClass.className,
            ' '
          );
        })
      );
    }
  }]);

  return ClassList;
}(React.Component);

var StudentList = function (_React$Component3) {
  _inherits(StudentList, _React$Component3);

  function StudentList() {
    _classCallCheck(this, StudentList);

    return _possibleConstructorReturn(this, (StudentList.__proto__ || Object.getPrototypeOf(StudentList)).apply(this, arguments));
  }

  _createClass(StudentList, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'ul',
        { className: 'vertical' },
        this.props.classes.map(function (ownedClass) {
          return React.createElement(
            ClassListElement,
            { ownedClass: ownedClass, label: ownedClass.className, key: ownedClass._id },
            ' ',
            ownedClass.className,
            ' '
          );
        })
      );
    }
  }]);

  return StudentList;
}(React.Component);

var CreateClassGUI = function (_React$Component4) {
  _inherits(CreateClassGUI, _React$Component4);

  function CreateClassGUI(props) {
    _classCallCheck(this, CreateClassGUI);

    var _this4 = _possibleConstructorReturn(this, (CreateClassGUI.__proto__ || Object.getPrototypeOf(CreateClassGUI)).call(this, props));
    //TODO in futute teachers should add as teachers and students as students


    _this4.state = {
      classes: [],
      people: [],
      text: ' '
    };
    _this4.handleChange = _this4.handleChange.bind(_this4);
    _this4.handleAdd = _this4.handleAdd.bind(_this4);
    return _this4;
  }

  _createClass(CreateClassGUI, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this5 = this;

      fetch('/react/userinfo').then(function (response) {
        return response.json();
      }).then(function (userJson) {
        return _this5.setState(function () {
          return { classes: userJson.classes };
        });
      });
      fetch('/react/peopleinfo').then(function (response) {
        return response.json();
      }).then(function (peopleJson) {
        return _this5.setState(function () {
          return { people: peopleJson.people };
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
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
          React.createElement(ClassList, { classes: this.state.classes }),
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
          )
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
  }]);

  return CreateClassGUI;
}(React.Component);

var CreateSkillsGUI = function (_React$Component5) {
  _inherits(CreateSkillsGUI, _React$Component5);

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

var Main = function (_React$Component6) {
  _inherits(Main, _React$Component6);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this7 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this7.state = {
      tabs: 1
    };
    return _this7;
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      var _this8 = this;

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
                return _this8.setState({ tabs: 1 });
              } }),
            React.createElement(TabHead, { value: "Create Skills", onClick: function onClick() {
                return _this8.setState({ tabs: 2 });
              } }),
            React.createElement(TabHead, { value: "Create Tree", onClick: function onClick() {
                return _this8.setState({ tabs: 3 });
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