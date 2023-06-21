import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      isExpanded: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchClick = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    // Lógica de búsqueda
  };

  render() {
    const { isExpanded } = this.state;

    return (
      <div className="search-bar">
        {!isExpanded && (
          <button className="search-icon" onClick={this.handleSearchClick}>
            <i className="fa fa-search"></i>
          </button>
        )}

        {isExpanded && (
          <form className="search-form" onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              placeholder="Buscar..."
              value={this.state.searchTerm}
              onChange={this.handleInputChange}
            />
            <button type="submit">
              <i className="fa fa-search"></i>{' '}
              {/* Utiliza el icono de búsqueda adecuado aquí */}
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default SearchBar;
