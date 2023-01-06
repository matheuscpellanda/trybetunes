import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { album } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
      trackCount,
    } = album;
    return (
      <div className="album-card">
        <img src={ artworkUrl100 } alt="" />
        <p>{ artistName }</p>
        <p>{ collectionName }</p>
        {/* <p>{ collectionPrice }</p> */}
        {/* <p>{ artworkUrl100 }</p> */}
        {/* <p>{ releaseDate }</p> */}
        <p>
          Nº de músicas:
          {' '}
          { trackCount }
        </p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Abrir
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
