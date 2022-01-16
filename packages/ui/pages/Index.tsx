import Header from '../components/Header';
import NgrokConceptImage from '../public/ngrok-concept.jpg';
import { BodyDiv, ContentDiv } from '../styles/body.style';

const Index = () => {
  return (
    <>
      <Header />
      <BodyDiv>
        <h1>Tunnel Services</h1>
        <ContentDiv>
          <h3>Web UI for Tunnel Services</h3>
          <img
            style={{ maxWidth: '100%' }}
            src={NgrokConceptImage.src}
            alt="concept for tunnel service"
          />
        </ContentDiv>
      </BodyDiv>
    </>
  );
};

export default Index;
