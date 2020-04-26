import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Carousel = ({ videos, setVideo }) => {
  return (
    <CarouselProvider
      naturalSlideWidth={16}
      naturalSlideHeight={9}
      totalSlides={videos.length}
      visibleSlides={videos.length > 2 ? 3 : videos.length}
      infinite={true}
    >
      <div style={{ width: "100%" }}>
        <Slider>
          {videos.map((video, x) => {
            return (
              <Slide index={x} key={x}>
                <Image
                  alt="1"
                  onClick={() => setVideo(video)}
                  style={{ cursor: "pointer" }}
                  src={`https://i3.ytimg.com/vi/${video.video}/maxresdefault.jpg`}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    fontSize: ".75em",
                    background: "#f1f1f1",
                    padding: "5px 5px",
                    margin: "5px 5px",
                  }}
                >
                  {video.text}
                </div>
              </Slide>
            );
          })}
        </Slider>
        {videos.length > 2 && (
          <>
            <ButtonBack
              className="button"
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translateY(-50%)",
              }}
            >
              Back
            </ButtonBack>
            <ButtonNext
              className="button"
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(-50%)",
              }}
            >
              Next
            </ButtonNext>
          </>
        )}
      </div>
    </CarouselProvider>
  );
};

export default Carousel;
