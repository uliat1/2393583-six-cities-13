import { Helmet } from 'react-helmet-async';
import { FormEvent, useState } from 'react';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { AuthorizationStatus, AppRoute, ALL_CITIES } from '../../const';
import { Navigate, Link } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/reducers/user-process/selector';
import { isPasswordValid, getRandomCity } from '../../utils';
import { changeCity } from '../../store/reducers/offer-process/offer-process';
import ErrorPassword from '../error-page/error-password/error-password';

function LoginScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(true);
  const randomCity = getRandomCity(ALL_CITIES);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as AuthData;
    setIsValid(isPasswordValid(data.password));

    if (data !== null && isPasswordValid(data.password)) {
      dispatch(loginAction(data));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Шесть городов. Авторизуйтесь, пожалуйста</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid="loginElement"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid="passwordElement"
                />
              </div>
              {!isValid && <ErrorPassword />}
              <button
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={() => dispatch(changeCity(randomCity))}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
