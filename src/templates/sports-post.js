import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link, withPrefix } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const SportsPostTemplate = ({
  content,
  contentComponent,
  description,
  files,
  tags,
  title,
  helmet
}) => {
  const PostContent = contentComponent || Content;

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
              {files &&
                files.map(file => {
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
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

SportsPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const SportsPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <SportsPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        frontImage={post.frontmatter.frontImage}
        files={post.frontmatter.files}
        helmet={
          <Helmet titleTemplate="%s | Sports">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

SportsPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default SportsPost;

export const pageQuery = graphql`
  query SportsPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        files {
          text
          file {
            relativePath
          }
        }
        tags
      }
    }
  }
`;
