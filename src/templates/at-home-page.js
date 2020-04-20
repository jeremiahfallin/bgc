import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import SportsPostsRoll from "../components/SportsPostsRoll";

export const AtHomePageTemplate = ({
  title,
  intro,
  content,
  contentComponent
}) => {
  const PostContent = contentComponent || Content;
  return (
    <div>
      <section className="section section--gradient">
        {title}
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

AtHomePageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string
};

const AtHomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <AtHomePageTemplate
        title={frontmatter.title}
        heading={frontmatter.heading}
        intro={frontmatter.intro}
        content={data.markdownRemark.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  );
};

AtHomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default AtHomePage;

export const atHomePageQuery = graphql`
  query AtHomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        intro {
          heading
          description
        }
        heading
      }
    }
  }
`;
