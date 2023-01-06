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
      <div data-testid="page-profile">
        <Header />
        {
          loading
            ? <p>Carregando...</p>
            : (
              <>
                <img src={ image } alt={ name } data-testid="profile-image" />
                Nome:
                <p>{ name }</p>
                Email:
                <p>{ email }</p>
                Descrição:
                <p>{ description }</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </>
            )
        }
      </div>
    );
  }
}

export default Profile;
