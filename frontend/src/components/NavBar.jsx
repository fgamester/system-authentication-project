import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { Context } from "../context/GlobalContext";

const NavBar = () => {
    const { actions, logged } = useContext(Context)

    return (
        <nav className="navbar navbar-expand-sm text-bg-dark fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to='/'>Navbar</Link>
                <div className="d-flex align-items-center justify-content-end gap-4" id="navbarNav">
                    {!logged && (
                        <>
                            <Link className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover"
                                to='/login'>Login</Link>
                            <Link className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover"
                                to='/register'>Register</Link>
                        </>
                    )}
                    {logged && (
                        <>
                            <Link className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-50-hover"
                                to='/private'>Private</Link>
                            <TbLogout onClick={() => actions.logout()} className="fs-2 pointer-hover" />
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar;