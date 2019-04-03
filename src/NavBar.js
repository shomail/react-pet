import React from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import colors from "./colors";

const Scale = keyframes`
  0 {
    transform: scale(1)
  }
  50% {
    transform: scale(1.5)
  }
  100% {
    transform: scale(1);
  }
`;

const NavBar = () => (
  <header
    css={css`
      background-color: ${colors.dark};
      position: sticky;
      top: 0;
      z-index: 10;
    `}
  >
    <Link
      css={css`
        &:hover {
          text-decoration: underline;
        }
      `}
      to="/"
    >
      Adopt Me!
    </Link>
    <Link
      css={css`
        display: inline-block;
        animation: 1s ${Scale} linear infinite;
      `}
      to="/"
    >
      <span aria-label="logo" role="img">
        ❤️
      </span>
    </Link>
  </header>
);

export default NavBar;
