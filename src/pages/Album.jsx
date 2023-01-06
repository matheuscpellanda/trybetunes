import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    album: undefined,
    tracks: undefined,
    favorites: undefined,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const tracks = await getMusics(id);
    // console.log(await getFavoriteSongs());
    let favorites = await getFavoriteSongs();
    favorites = favorites.map((favorite) => favorite.trackId);
    this.setState({
      album: tracks[0],
      tracks: tracks.slice(1, tracks.length),
      favorites,
    });
  }

  render() {
    const { album, tracks, favorites } = this.state;
    console.log(album);
    return (
      <div data-testid="page-album" className="album">
        <Header />
        <div className="column">
          {
            album ? <img src={ album.artworkUrl100 } alt="Imagem Artista" /> : null
          }
          <h1 data-testid="artist-name">{album ? album.artistName : 'Carregando...'}</h1>
          <h2 data-testid="album-name">{album ? album.collectionName : ''}</h2>
          <div className="album-tracks">
            {
              tracks
                ? tracks.map(
                  (track) => (<MusicCard
                    key={ track.trackId }
                    track={ track }
                    favorite={ favorites.includes(track.trackId) }
                    onTap={ () => {} }
                  />),
                )
                : null
            }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
