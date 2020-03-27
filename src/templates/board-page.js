import React, { useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql, withPrefix } from "gatsby";
import netlifyIdentity from "netlify-identity-widget";

import Layout from "../components/Layout";

export const BoardPageTemplate = ({ filesList, title, helmet }) => {
  const [user, setUser] = useState(netlifyIdentity.currentUser());

  netlifyIdentity.on("init", user => {
    setUser(user);
  });

  const login = () => {
    netlifyIdentity.open();
    netlifyIdentity.on("login", user => setUser(user));
  };

  const logout = () => {
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
                        <p className="has-text-weight-bold">{files.text}</p>
                      </li>
                      <ul>
                        {files &&
                          files.files &&
                          files["files"].map(file => {
                            return (
                              <>
                                {file.text && (
                                  <li key={file.text}>
                                    {file.file ? (
                                      <a
                                        href={`${withPrefix("/")}board/${
                                          file.file.relativePath
                                        }`}
                                      >
                                        {file.text}
                                      </a>
                                    ) : (
                                      file.text
                                    )}
                                  </li>
                                )}
                              </>
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

BoardPageTemplate.propTypes = {
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BoardPost = ({ data }) => {
  const {
    markdownRemark: { frontmatter: post }
  } = data;

  return (
    <Layout>
      <BoardPageTemplate
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
