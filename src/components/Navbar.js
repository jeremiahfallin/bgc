import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import logo from "../img/BoysandGirlsLogoHorizontal.png";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [activeAboutNav, setActiveAboutNav] = useState(false);
  const [activeProgramsNav, setActiveProgramsNav] = useState(false);
  const [activeSportsNav, setActiveSportsNav] = useState(false);

  const {
    allMarkdownRemark: { edges: posts }
  } = useStaticQuery(
    graphql`
      query SportsDropdownQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "sports-post" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  let subNav = {};
  subNav.programs = [
    { slug: "/summer", title: "Summer Programs" },
    { slug: "/junior", title: "Junior Club" }
  ];
  subNav.about = [
    { slug: "/about/safety", title: "Child Safety" },
    { slug: "/about", title: "Who We Are" },
    { slug: "/forms", title: "Club Forms" }
  ];
  subNav.sports = [];
  posts.map(post => {
    return subNav.sports.push({
      slug: post.node.fields.slug,
      title: post.node.frontmatter.title
    });
  });

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
            <div
              className={`navbar-group navbar-item ${
                activeAboutNav ? "active" : ""
              }`}
            >
              <span
                className={`navbar-group-parent`}
                onClick={() => {
                  setActiveAboutNav(a => !a);
                }}
              >
                About
                <div className="navbar-group-links">
                  {subNav.about.map((link, index) => {
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
              </span>
            </div>
            <Link className="navbar-item" to="/involvement">
              Get Involved
            </Link>
            <div
              className={`navbar-group navbar-item ${
                activeProgramsNav ? "active" : ""
              }`}
            >
              <span
                className={`navbar-group-parent`}
                onClick={() => {
                  setActiveProgramsNav(a => !a);
                }}
              >
                Programs
              </span>
              <div className="navbar-group-links">
                <Link to="/programs" className="navbar-item">
                  Programs Overview
                </Link>
                {subNav.programs.map((link, index) => {
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
            <div
              className={`navbar-group navbar-item ${
                activeSportsNav ? "active" : ""
              }`}
            >
              <span
                className={`navbar-group-parent`}
                onClick={() => {
                  setActiveSportsNav(a => !a);
                }}
              >
                Sports
              </span>
              <div className="navbar-group-links">
                <Link to="/sports" className="navbar-item">
                  RSP Info
                </Link>
                {subNav.sports.map((link, index) => {
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
            <Link className="navbar-item" to="/events">
              Events
            </Link>
          </div>
          <div className="navbar-end has-text-centered">
            <div className="navbar-item">
              <span className="icon is-small" style={{ marginRight: 4 }}>
                <a href={`mailto:contact@bgcuv.org`}>
                  <i
                    className="fas fa-envelope-square"
                    data-fa-transform="flip-h"
                    aria-hidden="true"
                  />
                </a>
              </span>
            </div>
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
