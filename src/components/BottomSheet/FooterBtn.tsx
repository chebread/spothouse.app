import {
  FooterBtnWrapperProvider,
  FooterBtnProvider,
} from './FooterBtnProvider';

const FooterBtn = ({ children, ...options }) => {
  return (
    <FooterBtnWrapperProvider>
      <FooterBtnProvider as={options.as} {...options}>
        <span>{children}</span>
      </FooterBtnProvider>
    </FooterBtnWrapperProvider>
  );
};

export default FooterBtn;
