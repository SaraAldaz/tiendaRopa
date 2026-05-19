import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/">
                    Gaia
                </Link>

                <div className="navbar-nav">

                    <Link className="nav-link" to="/">
                        Home
                    </Link>

                    <Link className="nav-link" to="/categorias">
                        Categorias
                    </Link>

                    <Link className="nav-link" to="/productos">
                        Productos
                    </Link>

                    <Link className="nav-link" to="/ventas">
                        Ventas
                    </Link>

                    <Link className="nav-link" to="/vendedores">
                        Vendedores
                    </Link>

                </div>

            </div>

        </nav>

    )

}

export default Navbar;