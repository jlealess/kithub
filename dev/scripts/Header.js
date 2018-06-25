import React from 'react';
import {
	BrowserRouter as Router,
	Route, Link, NavLink
} from 'react-router-dom';


const Header = (props) => {
	return <div className="header-container">
      <header>
		<div className="header__top-row">
        <h1 className="logo">
          <NavLink exact to="/">
            <img src="images/kithub-logo-v4.svg" alt="KitHub" />
          </NavLink>
        </h1>
        <nav className="main-nav clearfix">
          <ul className="clearfix main-nav__list">
            <li>
              <NavLink exact to="/" activeClassName="active" className="main-nav__list__link">
                Search
              </NavLink>
            </li>
            {props.loggedIn === true ? <li>
              <NavLink to="/my-kit" activeClassName="active" className="main-nav__list__link">
                My Kit
              </NavLink>
            </li> : null}
            {props.loggedIn === true ? <li>
              <NavLink to="/my-wishlist" activeClassName="active" className="main-nav__list__link">
                My Wishlist
              </NavLink>
            </li> : null}
            <li className="login">
              {props.loggedIn === false && <button onClick={props.loginWithGoogle} className="main-nav__list__link--button main-nav__list__link">
                  Login
                </button>}
              {props.loggedIn === true ? <button className="main-nav__list__link--button main-nav__list__link" onClick={props.logout}>
                  Logout
                </button> : null}
            </li>
          </ul>
        </nav>
		</div>
      </header>
    </div>;
}

export default Header;
