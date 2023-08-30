import { Outlet } from 'react-router-dom';
import Logo from '../logo/logo';
import SignIn from '../sign-in/sign-in';
import SignOut from '../sign-out/sign-out';
import { AuthorizationStatus } from '../../const';

type LayoutProps = {
    authorizationStatus: AuthorizationStatus;
}

function Layout({authorizationStatus}: LayoutProps): JSX.Element {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            {authorizationStatus === AuthorizationStatus.Auth ? <SignOut /> : <SignIn />}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
