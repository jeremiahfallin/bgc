import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import showdown from "showdown";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Content, { HTMLContent } from "../components/Content";

export const AboutPageTemplate = ({
  image,
  heading,
  title,
  contentComponent,
  board,
  staff
}) => {
  const converter = new showdown.Converter();
  const PageContent = contentComponent || Content;
  console.log(staff);

  return (
    <div>
      <Hero image={image} title={heading} />
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {title}
                </h2>
                <div className="container content">
                  <div className="columns">
                    <div className="section column">
                      <PageContent
                        className="content"
                        content={converter.makeHtml(staff)}
                      />
                    </div>
                    <div className="section column">
                      <PageContent
                        className="content"
                        content={converter.makeHtml(board)}
                      />
                    </div>
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

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        heading={post.frontmatter.heading}
        board={post.frontmatter.board}
        staff={post.frontmatter.staff}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
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
        board
        staff
      }
    }
  }
`;
