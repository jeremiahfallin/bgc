import React from "react";
import PropTypes from "prop-types";
import { graphql, withPrefix } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const InvolvementPageTemplate = ({
  image,
  heading,
  title,
  content,
  contentComponent,
  filesList
}) => {
  const PageContent = contentComponent || Content;
  console.log(filesList);

  return (
    <div>
      <div
        className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
          backgroundPosition: `top left`,
          backgroundAttachment: `fixed`
        }}
      >
        <div
          style={{
            display: "flex",
            height: "150px",
            lineHeight: "1",
            justifyContent: "space-around",
            alignItems: "left",
            flexDirection: "column"
          }}
        >
          <h1
            className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
            style={{
              boxShadow: "#0081c6 0.5rem 0px 0px, #0081c6 -0.5rem 0px 0px",
              backgroundColor: "#0081c6",
              color: "white",
              lineHeight: "1",
              padding: "0.25em"
            }}
          >
            {heading}
          </h1>
        </div>
      </div>
      <section className="section section--gradient">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {title}
                </h2>
                <ul>
                  {filesList &&
                    filesList.map(files => {
                      console.log(files);
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
                                files["files"].map(file => {
                                  if (file) {
                                    console.log(file);
                                    return (
                                      <li key={file.text}>
                                        <a
                                          href={`${withPrefix("/")}img/${
                                            file.file.relativePath
                                          }`}
                                        >
                                          {file.text}
                                        </a>
                                      </li>
                                    );
                                  } else {
                                    return null;
                                  }
                                })}
                            </ul>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                </ul>
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

InvolvementPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const InvolvementPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <InvolvementPageTemplate
        contentComponent={HTMLContent}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        heading={post.frontmatter.heading}
        content={post.html}
        filesList={post.frontmatter.filesList}
      />
    </Layout>
  );
};

InvolvementPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default InvolvementPage;

export const involvementPageQuery = graphql`
  query InvolvementPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
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
