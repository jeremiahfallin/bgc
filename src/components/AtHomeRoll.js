import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";

import Roll from "./Roll";

const AtHomeRoll = ({ data, count, theme }) => {
  console.log(data);
  data = {
    allMarkdownRemark: {
      edges: data.allMarkdownRemark.edges.filter(edge =>
        edge.node.frontmatter.tags.includes(theme)
      )
    }
  };
  return <Roll data={data} count={count} />;
};

AtHomeRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default ({ theme }) => (
  <StaticQuery
    query={graphql`
      query AtHomeRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "at-home-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                tags
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <AtHomeRoll data={data} count={count} theme={theme} />
    )}
  />
);
