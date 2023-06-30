import { Component } from 'react';

import { CiSearch } from 'react-icons/ci';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  changeInput(e) {
    this.setState({
      value: e.target.value,
    });
  }

  inputSubmit(e) {
    e.preventDefault();

    if (e.target.elements.query.value.trim() === '') {
      return;
    }

    this.props.handleSubmit(e);

    this.setState({ value: '' });
  }

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={e => this.inputSubmit(e)}>
          <button type="submit" className="searchForm-button">
            <span className="button-label">
              <CiSearch size="25px" />
            </span>
          </button>

          <input
            className="searchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.value}
            name="query"
            onChange={e => {
              this.changeInput(e);
            }}
          />
        </form>
      </header>
    );
  }
}
