import React, { useState } from "react";
import { Link } from "gatsby";
import logo from "../img/BoysandGirlsLogoHorizontal.png";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState(false);

  let subNav = {};
  subNav.posts = [
    { slug: "/", title: "Home" },
    { slug: "/events", title: "Events" }
  ];

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img
              src={logo}
              alt="BGCUV"
              style={{ height: "75px", width: "auto" }}
            />
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${active ? "is-active" : ""}`}
            data-target="navMenu"
            onClick={() => setActive(a => !a)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${active ? "is-active" : ""}`}
        >
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/involvement">
              Get Involved
            </Link>
            <div
              className={`navbar-group navbar-item ${
                activeSubNav ? "active" : ""
              }`}
            >
              <span
                onClick={() => {
                  setActiveSubNav(a => !a);
                }}
              >
                All of Blog
              </span>
              <div className="navbar-group-links">
                <Link to="/blog" className="navbar-item">
                  All Posts
                </Link>
                {subNav.posts.map((link, index) => {
                  return (
                    <Link
                      to={link.slug}
                      key={"posts-subnav-link-" + index}
                      className="navbar-item"
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link className="navbar-item" to="/programs">
              Programs
            </Link>
            <Link className="navbar-item" to="/sports">
              Sports
            </Link>
            <Link className="navbar-item" to="/events">
              Events
            </Link>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
          </div>
          <div className="navbar-end has-text-centered">
            <div className="navbar-item">
              <span className="icon is-small" style={{ marginRight: 4 }}>
                <i
                  className="fas fa-phone"
                  data-fa-transform="flip-h"
                  aria-hidden="true"
                />
              </span>
              <div className="container">541.440.9505</div>
            </div>
            <div className="navbar-item">
              <span className="icon is-small" style={{ marginRight: 4 }}>
                <i className="fas fa-map-marker" aria-hidden="true" />
              </span>
              <div className="container"> 1144 NE Cedar Street</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
