import React from "react";
import PropTypes from "prop-types";
import { ContactPageTemplate } from "../../templates/contact-page";

const ContactPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  const emails = entry.getIn(["data", "emailList"]);

  return (
    <ContactPageTemplate
      title={data.title}
      content={widgetFor("body")}
      phone={data.phone}
      address={data.address}
      emailList={emails && emails.toJS()}
    />
  );
};

ContactPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default ContactPagePreview;
