'use client';

import { createGlobalStyle } from 'styled-components';
import appCssVars from './cssVars/appCssVars';
import appThemes from './themes/appThemes';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize}
  body {
    ${appCssVars.all}
    ${appCssVars.mobile}
  }
  @media (min-width: 639.9px) {
    body {
      ${appCssVars.desktop}
    }
  }
  body {
    ${appThemes.light};
  }
  @media (prefers-color-scheme: dark) {
    body {
      ${appThemes.dark}
    }
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;;
  }
  // full height for next.js
  html,
  body,
  body > div:first-child,
  div#__next,
  div#__next > div {
    position: relative;
    height: 100%;
  }
`;

export default GlobalStyles;
