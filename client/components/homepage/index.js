import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { example, p, link } from './styles';
import testJSON             from './cskonopka-vault.json'
import Autosuggest          from 'react-autosuggest';
import VideoPlayer          from './videoplayer'
import placeholder          from './sig2.png';
import logo                 from './logo.png';

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : testJSON.filter(lang =>
    lang.title.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = suggestion => (
  <div>
      <a target="_blank" href={"https://vimeo.com/" + suggestion.id}>{suggestion.title}</a> 
  </div>
);

export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  static onEnter({store, nextState, replaceState, callback}) {
    callback(); // this call is important, don't forget it
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'search for a video',
      value,
      onChange: this.onChange
    };

    return <div>
      <Helmet
        title='Home page'
        meta={[
          {
            property: 'og:title',
            content: 'Golang Isomorphic React/Hot Reloadable/Redux/Css-Modules Starter Kit',
            script: 'https://unpkg.com/react-autosuggest/dist/standalone/autosuggest.js'
          }
        ]} />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
    </div>;
  }
}
