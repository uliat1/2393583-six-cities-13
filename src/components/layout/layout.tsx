import { Outlet } from 'react-router-dom';
import Logo from '../logo/logo';
import LogUser from '../log-user/log-user';
import { AuthorizationStatus } from '../../const';
import LogButton from '../log-button/log-button';

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
            {authorizationStatus === AuthorizationStatus.Auth ? <LogUser /> : <LogButton />}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
