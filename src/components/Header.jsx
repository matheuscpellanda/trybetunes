import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import logo from '../img/logo.png';
import iconProfile from '../img/icon_profile.png';
import iconSearch from '../img/icon_search.png';
import iconFavorite from '../img/icon_favorite.png';
import iconHome from '../img/icon_home.png';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: undefined,
      image: undefined,
    };
  }

  async componentDidMount() {
    const { name, image } = await getUser();
    this.setState({
      name,
      image,
    });
  }

  render() {
    const { name, image } = this.state;
    return (
      <header data-testid="header-component">
        <img src={ logo } alt="" />
        <nav>
          <Link to="/">
            <img src={ iconHome } alt="" />
            Home
          </Link>
          <Link to="/search" data-testid="link-to-search">
            <img src={ iconSearch } alt="" />
            Buscar
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <img src={ iconFavorite } alt="" />
            Favoritos
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <img src={ iconProfile } alt="" />
            Profile
          </Link>
        </nav>
        <div className="header-user">
          {
            image ? <img src={ image } alt="" /> : null
          }
          <p data-testid="header-user-name">{ name ?? 'Carregando...' }</p>
        </div>
      </header>
    );
  }
}

export default Header;
