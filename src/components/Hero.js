import React from "react";

export default ({ image, title, subheading }) => {
  if (image) {
    return (
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
          className="columns"
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
              padding: "0.25em",
              marginBottom: ".5em"
            }}
          >
            {title}
          </h1>
          {subheading && (
            <h3
              className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
              style={{
                boxShadow: "#0081c6 0.5rem 0px 0px, #0081c6 -0.5rem 0px 0px",
                backgroundColor: "#0081c6",
                color: "white",
                lineHeight: "1",
                padding: "0.25em",
                marginBottom: "1em"
              }}
            >
              {subheading}
            </h3>
          )}
          <div className="column is-10 is-offset-7">
            <a
              href="https://interland3.donorperfect.net/weblink/weblink.aspx?name=bgcumppqua&id=20"
              className="button is-primary is-large"
            >
              Donate Today
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
