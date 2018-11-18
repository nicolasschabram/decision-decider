import styled from "react-emotion";
import { colorCycle } from "../utils/colorCycle";
import { COLORS } from "../utils/Colors";

const backgroundColorCycle = colorCycle("background-color");

export const Button = styled("button")`
  border-radius: 3px;
  width: 100%;
  line-height: 2;
  border: 0 none;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  background: lightgrey;
  letter-spacing: 0.25ch;
  animation: ${({ disabled }: any) =>
    !disabled && `${backgroundColorCycle} ${COLORS.length * 5}s infinite`};
  transition: opacity 0.35s ease-out;

  &:hover {
    opacity: 0.85;
  }
`;
