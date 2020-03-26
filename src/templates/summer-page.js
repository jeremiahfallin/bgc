import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link, withPrefix } from "gatsby";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Content, { HTMLContent } from "../components/Content";

export const SummerPageTemplate = ({
  image,
  content,
  contentComponent,
  description,
  tags,
  title,
  filesList,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <Hero {...{ image, title }} />
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
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
                })}
            </ul>
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

SummerPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const SummerPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <SummerPageTemplate
        image={post.image}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        frontImage={post.frontmatter.frontImage}
        filesList={post.frontmatter.filesList}
        helmet={
          <Helmet titleTemplate="%s | Summer">
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

SummerPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default SummerPage;

export const pageQuery = graphql`
  query SummerPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
        tags
      }
    }
  }
`;
