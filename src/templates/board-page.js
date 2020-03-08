import React, { useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import netlifyIdentity from "netlify-identity-widget";

import Layout from "../components/Layout";

export const BoardPostTemplate = ({ filesList, title, helmet }) => {
  const [user, setUser] = useState(netlifyIdentity.currentUser());

  const login = () => {
    console.log("try to log on?");
    netlifyIdentity.open();
    netlifyIdentity.on("login", user => setUser(user));
  };

  const logout = () => {
    console.log("try to log out?");
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", user => setUser(user));
  };

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {user ? (
              <button className="button is-primary" onClick={e => logout()}>
                Log out
              </button>
            ) : (
              <button className="button is-primary" onClick={e => login()}>
                Log in
              </button>
            )}
            <ul>
              {user &&
                user.email &&
                filesList &&
                filesList.map(files => {
                  return (
                    <div key={files.text}>
                      <li>
                        <b>
                          <p>{files.text}</p>
                        </b>
                      </li>
                      <ul>
                        {files["files"].map(file => {
                          return (
                            <li key={file.text}>
                              {console.log(file.file.relativePath)}
                              <Link to={`img/${file.file.relativePath}`}>
                                {file.text}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

BoardPostTemplate.propTypes = {
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BoardPost = ({ data }) => {
  const {
    markdownRemark: { frontmatter: post }
  } = data;
  console.log(data);

  return (
    <Layout>
      <BoardPostTemplate
        filesList={post.filesList}
        helmet={
          <Helmet titleTemplate="%s | Board">
            <title>{`${post.title}`}</title>
          </Helmet>
        }
        title={post.title}
      />
    </Layout>
  );
};

BoardPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BoardPost;

export const pageQuery = graphql`
  query BoardPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        filesList {
          text
          files {
            text
            file {
              relativePath
            }
          }
        }
      }
    }
  }
`;
