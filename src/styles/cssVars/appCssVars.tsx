import buildCssVars from 'lib/buildCssVars';
import cssVars from './cssVars';

const appCssVars = {
  mobile: buildCssVars(cssVars.mobile),
  desktop: buildCssVars(cssVars.desktop),
  all: buildCssVars(cssVars.all),
};

export default appCssVars;
