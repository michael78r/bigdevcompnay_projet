import React from "react";
import { Link } from "react-router-dom";

export function Template({ children }) {
    return (
        <div>
            <nav class="pcoded-navbar theme-horizontal menu-light brand-blue">
                <div class="navbar-wrapper container">
                    <div class="navbar-content sidenav-horizontal" id="layout-sidenav">
                        <ul class="nav pcoded-inner-navbar sidenav-inner">
                            <li class="nav-item">
                            <Link to="/joueur_liste" class="nav-link " ><span class="pcoded-micon"><i class="feather icon-layout"></i></span><span class="pcoded-mtext">Player</span></Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/club" class="nav-link " ><span class="pcoded-micon"><i class="feather icon-layout"></i></span><span class="pcoded-mtext">Club Team</span></Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/national" class="nav-link " ><span class="pcoded-micon"><i class="feather icon-layout"></i></span><span class="pcoded-mtext">National Team</span></Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/filtrage" class="nav-link " ><span class="pcoded-micon"><i class="feather icon-layout"></i></span><span class="pcoded-mtext">Filtering</span></Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <header className="navbar pcoded-header navbar-expand-lg navbar-light header-blue">
                <div className="m-header">
                    <a className="mobile-menu" id="mobile-collapse" href="#!"><span></span></a>
                    <a href="#!" className="b-brand">
                        <img src="assets/images/logo.png" alt="" className="logo" />
                        <img src="assets/images/logo-icon.png" alt="" className="logo-thumb" />
                    </a>
                    <a href="#!" className="mob-toggler">
                        <i className="feather icon-more-vertical"></i>
                    </a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a href="#!" className="pop-search"><i className="feather icon-search"></i></a>
                            <div className="search-bar">
                                <input type="text" className="form-control border-0 shadow-none" placeholder="Search hear" />
                                <button type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li>
                            <div className="dropdown">
                                <a className="dropdown-toggle" href="#" data-toggle="dropdown"><i className="icon feather icon-bell"></i></a>
                            </div>
                        </li>
                        <li>
                            <div className="dropdown drp-user">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="feather icon-user"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right profile-notification">
                                    <div className="pro-head">
                                        <img src={require('../public/images/user/avatar-1.jpg')} className="img-radius" alt="User-Profile-Image" />
                                        <span>Admin</span>
                                        <a href="auth-signin.html" className="dud-logout" title="Logout">
                                            <i className="feather icon-log-out"></i>
                                        </a>
                                    </div>
                                    <ul className="pro-body">
                                        <li><a href="user-profile.html" className="dropdown-item"><i className="feather icon-user"></i> Profil</a></li>
                                        <li><a href="email_inbox.html" className="dropdown-item"><i className="feather icon-mail"></i> Messages</a></li>
                                        <li><a href="auth-signin.html" className="dropdown-item"><i className="feather icon-lock"></i> Verrouiller</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>


            </header>

            <div className="pcoded-main-container">
            <br></br>
                    {children}
                </div>
            </div>
        // </div>
    )
}