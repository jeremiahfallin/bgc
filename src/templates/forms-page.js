import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql, withPrefix } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const FormsPageTemplate = ({
  content,
  contentComponent,
  description,
  filesList,
  title,
  helmet
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <ul>
              {filesList &&
                filesList.map((files, index) => {
                  if (files) {
                    return (
                      <div key={files.text}>
                        <li>
                          <b>
                            <p>{files.text}</p>
                          </b>
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
                                          href={`${withPrefix("/")}img/${
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
                  } else {
                    return null;
                  }
                })}
            </ul>
            <PageContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

FormsPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const FormsPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <FormsPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        frontImage={post.frontmatter.frontImage}
        filesList={post.frontmatter.filesList}
        helmet={
          <Helmet titleTemplate="%s | Forms">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

FormsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default FormsPage;

export const pageQuery = graphql`
  query FormsPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
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
