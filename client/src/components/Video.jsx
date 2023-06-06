import { Container } from "react-bootstrap";

function Video() {
  return (
    <Container className="mt-5">
      <iframe
        width="670"
        height="480"
        src="https://www.youtube.com/embed/xopvkx6CpNs"
        title="How to Embed a Video on a Website (Embed Your YouTube Videos!)"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </Container>
  );
}

export default Video;
