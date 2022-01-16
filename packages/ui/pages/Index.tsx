import Header from '../components/Header';
import NgrokConceptImage from '../public/ngrok-concept.jpg';
import NgrokConceptMobileImage from '../public/ngrok-concept-mobile.jpg';
import { BodyDiv } from '../styles/body.style';

const Index = () => {
  return (
    <>
      <Header />
      <BodyDiv>
        <h1>Tunnel Services</h1>
        <h2>Web UI for Tunnel Services</h2>
        <picture>
          <source
            style={{ maxWidth: '100%' }}
            media={'(min-width: 1024px)'}
            srcSet={NgrokConceptImage.src}
          />
          <source
            style={{ maxWidth: '100%' }}
            srcSet={NgrokConceptMobileImage.src}
          />
          <img
            style={{ maxWidth: '100%' }}
            src={NgrokConceptMobileImage.src}
            alt="concept for tunnel service"
          />
        </picture>
      </BodyDiv>
    </>
  );
};

export default Index;
