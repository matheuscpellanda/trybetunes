import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favorite: props.favorite,
    };
  }

  handleChange = async ({ target: { checked } }) => {
    const { track } = this.props;
    this.setState({
      loading: true,
    });
    if (checked) {
      await addSong(track);
    } else {
      await removeSong(track);
    }
    let favorites = await getFavoriteSongs();
    favorites = favorites.map((favorite) => favorite.trackId);
    this.setState({
      favorite: favorites.includes(track.trackId),
    });
    this.setState({
      loading: false,
    });
  };

  render() {
    const { track: { trackId, trackName, previewUrl }, onTap } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div className="music-card">
        <div className="column">
          <p>{ trackName }</p>
          <label htmlFor="checkbox-favorite">
            Favorita
            <input
              type="checkbox"
              name="favorite"
              id="checkbox-favorite"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.handleChange }
              checked={ favorite }
              onClick={ onTap }
            />
            {
              loading ? <p>Carregando...</p> : null
            }
          </label>
        </div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favorite: PropTypes.bool.isRequired,
  track: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
  onTap: PropTypes.func.isRequired,
};
