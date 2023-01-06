import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    tracks: undefined,
    loading: false,
  };

  async componentDidMount() {
    this.updateFavoritesList();
  }

  updateFavoritesList = async () => {
    this.setState({
      loading: true,
    }, async () => {
      const tracks = await getFavoriteSongs();
      this.setState({
        tracks,
        loading: false,
      });
    });
  };

  render() {
    const { tracks, loading } = this.state;
    return (
      <div data-testid="page-favorites" className="favorites">
        <Header />
        <div className="column">
          {
            loading ? <p>Carregando...</p> : <h1>Músicas Favoritas</h1>
          }
          <div className="favorites-tracks">
            {
              tracks && !loading ? (
                tracks.map((track) => {
                  console.log(typeof (track.trackId), track.trackId);
                  return (<MusicCard
                    key={ parseInt(track.trackId, 10) } // Bug na função getFavoriteSongs: retorna algumas músicas com trackId do tipo string
                    track={ { ...track, ...{ trackId: parseInt(track.trackId, 10) } } } // Bug na função getFavoriteSongs: retorna algumas músicas com trackId do tipo string
                    favorite
                    onTap={ this.updateFavoritesList }
                  />
                  );
                })) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
