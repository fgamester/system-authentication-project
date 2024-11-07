import React, { useContext, useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { Context } from "../context/GlobalContext";

const NavBar = () => {
    const { actions, logged } = useContext(Context)

    return (
        <nav className="navbar navbar-expand-sm text-bg-dark fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to='/'>Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <FaBars className="text-light fs-2" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav gap-sm-4">
                        <li className="nav-item">
                            <Link className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover"
                                to='/login'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover"
                                to='/register'>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover"
                                to='/'>Pricing</Link>
                        </li>
                        {logged && (
                            <li className="nav-item">
                                <TbLogout onClick={()=>actions.logout()} className="fs-2 pointer-hover" />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;