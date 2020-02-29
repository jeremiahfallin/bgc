import React from "react";
import { hydrate } from "react-dom";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";

// const secret = (event, context, callback) => {
//   const { identity, user } = context.clientContext;
//   if (user.app_metadata.roles != "visitor") {
//     // Call a secret function to hydrate your application with secret data only logged in users can see
//     return callback(null, {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: "hello there, this is some super secret data"
//       })
//     });
//   } else {
//     //data is secret//
//     return callback(null, {
//       statusCode: 200,
//       body: JSON.stringify({
//         message:
//           "hello there, sorry but this data is secret and requires log in"
//       })
//     });
//   }
// };

export const BoardPostTemplate = ({ filesList, title, helmet }) => {
  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {hydrate(secret())}
            <ul>
              {filesList &&
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
                              <Link to={file.file.absolutePath}>
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
              absolutePath
            }
          }
        }
      }
    }
  }
`;
