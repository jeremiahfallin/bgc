import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Content, { HTMLContent } from "../components/Content";
import SportsPostsRoll from "../components/SportsPostsRoll";

export const SportsPageTemplate = ({
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
                    <h3 className="has-text-weight-semibold is-size-2">
                      Latest Sports News
                    </h3>
                    <SportsPostsRoll />
                  </div>
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

SportsPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string
};

const SportsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  console.log(frontmatter);

  return (
    <Layout>
      <SportsPageTemplate
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

SportsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default SportsPage;

export const sportsPageQuery = graphql`
  query SportsPage($id: String!) {
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
