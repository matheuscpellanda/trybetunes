import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const user = await getUser();
      this.setState({
        ...user,
        loading: false,
      });
    });
  }

  render() {
    const { description, email, image, name, loading } = this.state;
    return (
      <div data-testid="page-profile" className="profile">
        <Header />
        {
          loading
            ? (
              <div className="loading"><p>Carregando...</p></div>
            )
            : (
              <div className="profile-form">
                <img src={ image } alt={ name } data-testid="profile-image" />
                <div className="profile-info">
                  Nome:
                  <p>{ name }</p>
                </div>
                <div className="profile-info">
                  Email:
                  <p>{ email }</p>
                </div>
                <div className="profile-info">
                  Descrição:
                  <p>{ description }</p>
                </div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
