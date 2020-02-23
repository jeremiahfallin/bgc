import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const JuniorPageTemplate = ({
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
                    <li key={file.text}>
                      <Link to={file.file.absolutePath}>{file.text}</Link>
                    </li>
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

JuniorPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const JuniorPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <JuniorPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        frontImage={post.frontmatter.frontImage}
        files={post.frontmatter.files}
        helmet={
          <Helmet titleTemplate="%s | Junior">
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

JuniorPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default JuniorPage;

export const pageQuery = graphql`
  query JuniorPageByID($id: String!) {
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
            absolutePath
          }
        }
        tags
      }
    }
  }
`;
