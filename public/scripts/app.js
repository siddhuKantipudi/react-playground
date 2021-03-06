"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleRemoveAllOptions = _this.handleRemoveAllOptions.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleRemoveOption = _this.handleRemoveOption.bind(_this);

        _this.state = {
            options: props.options
        };
        return _this;
    }

    _createClass(App, [{
        key: "handlePick",
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            var randomOption = this.state.options[randomNum];
            console.log(randomOption);
        }
    }, {
        key: "handleRemoveAllOptions",
        value: function handleRemoveAllOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: "handleRemoveOption",
        value: function handleRemoveOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: "handleAddOption",
        value: function handleAddOption(option) {
            if (!option) {
                return "enter valid option";
            } else if (this.state.options.indexOf(option) !== -1) {
                return "enter valid unique option";
            }

            this.setState(function (prevState) {
                return { options: prevState.options.concat([option]) };
            });
        }
    }, {
        key: "render",
        value: function render() {
            var title = "Todoist";
            return React.createElement(
                "div",
                null,
                React.createElement(Header, { title: title, subtitle: "focus" }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleRemoveAllOptions: this.handleRemoveAllOptions,
                    handleRemoveOption: this.handleRemoveOption
                }),
                React.createElement(Action, {
                    handlePick: this.handlePick,
                    hasOptions: this.state.options.length > 0
                }),
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption
                })
            );
        }
    }]);

    return App;
}(React.Component);

App.defaultProps = {
    options: []
};

var Header = function Header(props) {
    return React.createElement(
        "header",
        null,
        React.createElement(
            "h1",
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            "h2",
            null,
            props.subtitle
        )
    );
};

var Options = function Options(props) {
    return React.createElement(
        "div",
        null,
        props.options.map(function (option) {
            return React.createElement(Option, {
                key: option,
                OptionText: option,
                handleRemoveOption: props.handleRemoveOption
            });
        }),
        React.createElement(
            "button",
            { onClick: props.handleRemoveAllOptions },
            "Remove All"
        )
    );
};

var Option = function Option(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "li",
            null,
            props.OptionText
        ),
        React.createElement(
            "button",
            {
                onClick: function onClick(e) {
                    props.handleRemoveOption(props.OptionText);
                }
            },
            "Remove"
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: "handleAddOption",
        value: function handleAddOption(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option);
            this.setState(function () {
                return { error: error };
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { onSubmit: this.handleAddOption },
                    React.createElement("input", { type: "text", name: "option" }),
                    this.state.error && React.createElement(
                        "p",
                        null,
                        this.state.error
                    ),
                    React.createElement(
                        "button",
                        null,
                        "Add Option"
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

var Action = function Action(props) {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "button",
            {
                onClick: props.handlePick,
                disabled: !props.hasOptions
            },
            "What should I do?"
        )
    );
};

ReactDOM.render(React.createElement(App, { options: ["option 1", "option 2", "option 3"] }), document.getElementById('app'));
