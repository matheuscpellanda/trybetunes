import React from 'react';
import PropTypes from 'prop-types';
import { createUser, getUser } from '../services/userAPI';
import logo from '../img/logo.png';

const MIN_LEN_NAME = 3;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      disableSubmit: true,
      loading: false,
      ready: false,
    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const { name } = await getUser();
    if (name) {
      return history.push('/search');
    }
    this.setState({
      ready: true,
    });
  }

  handlerChange = ({ target }) => {
    const { value } = target;
    this.setState({
      userName: value,
      disableSubmit: value.length < MIN_LEN_NAME,
    });
  };

  handlerSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const { userName } = this.state;
    const { history } = this.props;
    await createUser({ name: userName });
    this.setState({
      loading: false,
    });
    return history.push('/search');
  };

  render() {
    const { disableSubmit, loading, ready } = this.state;
    return (
      <div data-testid="page-login" className="login">
        <form className="form-login">
          <img src={ logo } alt="Logo TrybeTunes" />
          {
            ready && !loading ? (
              <>
                <input
                  type="text"
                  name=""
                  id=""
                  data-testid="login-name-input"
                  placeholder="qual é o seu nome?"
                  onChange={ this.handlerChange }
                />
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ disableSubmit }
                  onClick={ this.handlerSubmit }
                >
                  Entrar

                </button>
              </>
            ) : (
              <p>Carregando...</p>
            )
          }
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
