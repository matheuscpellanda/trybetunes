import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
    submitDisabled: true,
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

  validate = () => {
    const { description, email, image, name } = this.state;
    const texts = [description, email, image, name];
    const validation = texts.every((text) => text.length > 0);
    this.setState({
      submitDisabled: !validation,
    });
  };

  handleChange = async ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => this.validate());
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { description, email, image, name } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await updateUser({ description, email, image, name });
      this.setState({ loading: false });
      return history.push('/profile');
    });
  };

  render() {
    const { description, email, image, name, loading, submitDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit" className="profile">
        <Header />
        {
          loading
            ? (
              <div className="loading"><p>Carregando...</p></div>
            )
            : (
              <form className="form-edit-profile">
                <div className="row">
                  <img src={ image } alt={ name } />
                  <label htmlFor="edit-input-image">
                    URL:
                    <input
                      type="text"
                      name="image"
                      value={ image }
                      id="edit-input-image"
                      data-testid="edit-input-image"
                      onChange={ this.handleChange }
                    />
                  </label>
                </div>
                <label htmlFor="edit-input-name">
                  Nome:
                  <input
                    type="text"
                    name="name"
                    value={ name }
                    id="edit-input-name"
                    data-testid="edit-input-name"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="edit-input-email">
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={ email }
                    id="edit-input-email"
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="edit-input-description">
                  Descrição:
                  <input
                    type="text"
                    name="description"
                    value={ description }
                    id="edit-input-description"
                    data-testid="edit-input-description"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="submit"
                  disabled={ submitDisabled }
                  data-testid="edit-button-save"
                  onClick={ this.handleSubmit }
                >
                  Editar perfil

                </button>
              </form>
            )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
