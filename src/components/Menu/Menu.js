import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <nav className="menu">
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </label>
      <ul className="menu-items">
        <li>
          <Link to="/pagos-realizados">
            <i className="fas fa-money-bill-wave"></i> Pagos Realizados
          </Link>
        </li>
        <li>
          <Link to="/comportamiento">
            <i className="fas fa-chart-line"></i> Comportamiento
          </Link>
        </li>
        <li>
          <Link to="/administracion">
            <i className="fas fa-cogs"></i> Administración
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
