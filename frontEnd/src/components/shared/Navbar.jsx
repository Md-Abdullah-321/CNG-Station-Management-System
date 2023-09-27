import { Li, StyledNavLink } from "../ui/component.styled";

function LI({ name, directory }) {
  return (
    <Li>
      <StyledNavLink to={directory}>{name}</StyledNavLink>
    </Li>
  );
}

export default LI;
