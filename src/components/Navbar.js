import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import netlifyIdentity from "netlify-identity-widget";

import logo from "../img/BoysAndGirlsClubLogo.jpg";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("");

  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  const {
    allMarkdownRemark: { edges: posts },
  } = useStaticQuery(
    graphql`
      query DropdownQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { regex: "/post/" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                active
              }
            }
          }
        }
      }
    `
  );

  const subNav = {};
  subNav.programs = [
    { slug: "/programs", title: "Programs Overview" },
    { slug: "/summer", title: "Summer Programs" },
    { slug: "/junior", title: "Junior Club" },
  ];
  subNav.about = [
    { slug: "/about/safety", title: "Child Safety" },
    { slug: "/about", title: "Who We Are" },
    { slug: "/forms", title: "Club Forms" },
  ];
  subNav.sports = [];
  subNav.events = [{ slug: "/partners", title: "Our Community Partners" }];
  posts.forEach((post) => {
    if (post.node.frontmatter.active) {
      if (post.node.fields.slug.includes("sports")) {
        subNav.sports.push({
          slug: post.node.fields.slug,
          title: post.node.frontmatter.title,
        });
      } else if (post.node.fields.slug.includes("event-posts")) {
        subNav.events.push({
          slug: post.node.fields.slug,
          title: post.node.frontmatter.title,
        });
      }
    }
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
            onClick={() => setActive((a) => !a)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${active ? "is-active" : ""}`}
          aria-label="dropdown navigation"
        >
          <div className="navbar-start has-text-centered">
            <div
              className={`navbar-item has-dropdown ${
                selectedDropdown === "about" ? "is-active" : ""
              }`}
              onClick={(e) =>
                setSelectedDropdown((prev) => (prev !== "about" ? "about" : ""))
              }
            >
              <div to="/about" className={`navbar-link`}>
                About
              </div>
              <div className="navbar-dropdown">
                {subNav.about.map((link, index) => {
                  return (
                    <Link
                      to={link.slug}
                      className={`navbar-item`}
                      key={"posts-subnav-link-" + index}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link className="navbar-item" to="/involvement">
              Get Involved
            </Link>
            <div
              className={`navbar-item has-dropdown ${
                selectedDropdown === "programs" ? "is-active" : ""
              }`}
              onClick={(e) =>
                setSelectedDropdown((prev) =>
                  prev !== "programs" ? "programs" : ""
                )
              }
            >
              <div className={`navbar-link`}>Programs</div>
              <div className="navbar-dropdown">
                {subNav.programs.map((link, index) => {
                  return (
                    <Link
                      to={link.slug}
                      className={`navbar-item`}
                      key={"posts-subnav-link-" + index}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div
              className={`navbar-item has-dropdown ${
                selectedDropdown === "sports" ? "is-active" : ""
              }`}
              onClick={(e) =>
                setSelectedDropdown((prev) =>
                  prev !== "sports" ? "sports" : ""
                )
              }
            >
              <div to="/sports" className={`navbar-link`}>
                Sports
              </div>
              <div className="navbar-dropdown">
                <Link to="/sports" className="navbar-item">
                  RSP Info
                </Link>
                {subNav.sports.map((link, index) => {
                  return (
                    <Link
                      to={link.slug}
                      className={`navbar-item`}
                      key={"posts-subnav-link-" + index}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div
              className={`navbar-item has-dropdown ${
                selectedDropdown === "events" ? "is-active" : ""
              }`}
              onClick={(e) =>
                setSelectedDropdown((prev) =>
                  prev !== "events" ? "events" : ""
                )
              }
            >
              <div to="/events" className={`navbar-link`}>
                Events
              </div>
              <div className="navbar-dropdown">
                <Link to="/events" className="navbar-item">
                  Event Info
                </Link>
                {subNav.events.map((link, index) => {
                  return (
                    <Link
                      to={link.slug}
                      className={`navbar-item`}
                      key={"posts-subnav-link-" + index}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link to="/at-home" className="navbar-item">
              @ Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
