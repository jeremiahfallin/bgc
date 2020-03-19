import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Content, { HTMLContent } from "../components/Content";

export const PartnersPageTemplate = ({
  image,
  title,
  intro,
  content,
  contentComponent
}) => {
  const PostContent = contentComponent || Content;
  return (
    <div>
      <Hero {...{ image, title }} />
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  {intro && (
                    <div className="content">
                      <div className="tile">
                        <h1 className="title">{intro ? intro.heading : ""}</h1>
                      </div>
                      <div className="tile">
                        <h3 className="subtitle">
                          {intro ? intro.description : ""}
                        </h3>
                      </div>
                    </div>
                  )}
                  <div className="content">
                    <PostContent content={content} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

PartnersPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string
};

const PartnersPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <PartnersPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        intro={frontmatter.intro}
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  );
};

PartnersPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default PartnersPage;

export const partnersPageQuery = graphql`
  query PartnersPage($id: String!) {
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
        intro {
          heading
          description
        }
        heading
      }
    }
  }
`;
