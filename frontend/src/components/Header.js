import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';

function Header(props) {
    
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип Место"/>
            <Route exact path="/">
                <button className={`${props.hamburgerMenuStatus ? "header__hamburger-button_active" : "header__hamburger-button"}`} onClick={props.onHamburgerMenuClick} type="button" ></button>
            </Route>

            <Route path="/signin">
                <Link className="header__auth-link" to="/signup">
                    Регистрация
                </Link>
            </Route>
            <Route path="/signup">
                <Link className="header__auth-link" to="/signin">
                    Войти
                </Link>
            </Route>
            <Route exact path="/">
                <p className="header__auth-email">{props.email}</p>
                <button
                    className="header__exit-button"
                    onClick={props.onSignOut}>Выйти</button>
            </Route>
        </header> 
    )
}

export default Header;