import React from "react";
import PropTypes from "prop-types";
import { graphql, withPrefix } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const ContactPageTemplate = ({
  title,
  phone,
  content,
  contentComponent,
  address,
  emailList,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">{title}</h1>
          </div>
        </div>
      </section>
      <section className="section section--gradient">
        <div className="container content">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <div className="columns">
                <div className="column">
                  <b>Phone: </b> <a href={`tel:+${phone}`}>{phone}</a>
                  {emailList &&
                    emailList.map((emails) => {
                      return (
                        <div key={emails.text}>
                          <b>{emails.text}</b>:{" "}
                          <a href={`mailto:${emails.email}`}>{emails.email}</a>
                        </div>
                      );
                    })}
                </div>
                <div className="column is-two-thirds">
                  <b>Main Office: </b>
                  <a href={address.url}>{address.address}</a>
                  <div
                    className="column"
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%" /* 16:9 */,
                      paddingTop: 25,
                      height: 0,
                    }}
                  >
                    <iframe
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      frameBorder="0"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53023.03557042119!2d-84.34590450087259!3d33.83966507565114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5047a3b061fb3%3A0x123010dbc2c635b2!2sCenters%20for%20Disease%20Control%20and%20Prevention!5e0!3m2!1sen!2sus!4v1605228779585!5m2!1sen!2sus"
                    />
                  </div>
                </div>
              </div>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(data);

  return (
    <Layout>
      <ContactPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        phone={post.frontmatter.phone}
        address={post.frontmatter.address[0]}
        content={post.html}
        emailList={post.frontmatter.emailList}
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        phone
        address {
          address
          url
        }
        emailList {
          text
          email
        }
      }
    }
  }
`;
