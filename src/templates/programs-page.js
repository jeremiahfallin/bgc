import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const ProgramsPageTemplate = ({
  title,
  content,
  contentComponent,
  toc
}) => {
  const PageContent = contentComponent || Content;
  const TOC = contentComponent || Content;

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <div className="is-parent column is-6">
                <div className="tile is-child box notification">
                  <TOC className="content toc" content={toc} />
                </div>
                <div className="column" />
              </div>
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ProgramsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const ProgramsPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ProgramsPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        toc={post.tableOfContents}
      />
    </Layout>
  );
};

ProgramsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ProgramsPage;

export const programsPageQuery = graphql`
  query ProgramsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
      tableOfContents(absolute: true)
    }
  }
`;
