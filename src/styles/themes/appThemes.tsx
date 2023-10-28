import buildCssVars from 'lib/buildCssVars';
import themeVariables from './themeVars'; // import { themeVariables } from 'layout/themes' 로는 접근할 수 없음을 유의

const appThemes = {
  light: buildCssVars(themeVariables.light),
  dark: buildCssVars(themeVariables.dark),
};

export default appThemes;
