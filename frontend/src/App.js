import './App.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUser } from "./store/actions";
import Fetching from "./components/Fetching/Fetching";
import Final from "./components/Final/Final";
import Form from "./components/Form/Form";
import animateBg from "./animate-bg";

class App extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentWillMount() {
    this.props.fetchUser(this.props.user.id);
  }

  componentDidMount() {
    animateBg(this.canvasRef.current);
  }

  componentWillUnmount() {
  }

  render() {
    const view = this.getView();
    return (
      <div className={`app-page app-page_${this.getPageClass()}`}>
        <canvas className="app-page__bg" ref={this.canvasRef} />
        <a href="https://aviasales.com" target="_blank" rel="noopener noreferrer" className="app-page__logo"/>
        <div className="app-page__content">{ view }</div>
      </div>
    );
  }

  getView() {
    const { user } = this.props;
    return user.fetching
      ? <Fetching/>
      : user.shared && user.email
        ? <Final/>
        : <Form/>;
  }

  getPageClass() {
    const { user } = this.props;
    return user.fetching
      ? 'fetching'
      : user.shared && user.email
        ? 'final'
        : 'form';
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
