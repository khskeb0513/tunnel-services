import styled from 'styled-components';

class HeaderLink {
  constructor(public name: string, public url: string) {}
}

const headerLinkArr: HeaderLink[] = [
  new HeaderLink('Tunnel Service', null),
  new HeaderLink('Home', '/'),
  new HeaderLink('Logger', '/logger'),
  new HeaderLink('Ngrok', '/ngrok-tunnel'),
];

const StyledDiv = styled.div`
  display: block;
  background: rgba(46, 46, 46, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  left: 0;
  padding: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
`;

const HeaderUl = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 10px;
`;

const HeaderLi = styled.li`
  float: left;
  display: list-item;
`;

const HeaderChildren = styled.a`
  color: white;
  display: block;
  padding: 5px 10px;
  text-decoration: none;
  font-size: 1em;
  &:hover {
    background: darkgray;
  }
`;

const Header = () => {
  return (
    <StyledDiv>
      <HeaderUl>
        {headerLinkArr.map((link, i) => (
          <HeaderLi key={+i}>
            {!link.url ? (
              <HeaderChildren>{link.name}</HeaderChildren>
            ) : (
              <HeaderChildren href={link.url}>{link.name}</HeaderChildren>
            )}
          </HeaderLi>
        ))}
      </HeaderUl>
    </StyledDiv>
  );
};

export default Header;
