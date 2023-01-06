import React from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_LEN_NAME = 2;

class Search extends React.Component {
  state = {
    disableSubmit: true,
    searchBox: '',
    loading: false,
    artist: undefined,
    albuns: undefined,
  };

  handleChange = (element) => {
    const { target: { value } } = element;
    this.setState({
      disableSubmit: value.length < MIN_LEN_NAME,
      searchBox: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      artist: undefined,
    });
    const { searchBox } = this.state;
    const albuns = await searchAlbumsAPI(searchBox);
    this.setState({
      searchBox: '',
      loading: false,
      artist: searchBox,
      albuns: albuns.length > 0 ? albuns : undefined,
    });
  };

  render() {
    const { disableSubmit, searchBox, loading, artist, albuns } = this.state;
    return (
      <div data-testid="page-search" className="search">
        <Header />
        <div className="column">
          <form className="form-search">
            <input
              type="text"
              name="searchBox"
              value={ searchBox }
              id=""
              placeholder="DIGITE A SUA PESQUISA"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ disableSubmit }
              onClick={ this.handleSubmit }
            >
              Pesquisar
            </button>
          </form>
          <div className="search-results">
            <p>
              {
                loading ? 'Carregando...' : null
              }
              {
                artist && albuns ? `Resultado de álbuns de: ${artist}` : null
              }
            </p>
            {
              artist && !albuns ? <p>Nenhum álbum foi encontrado</p> : null
            }
            {
              albuns
                ? albuns.map((album) => (
                  <Card key={ album.collectionId } album={ album } />))
                : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
