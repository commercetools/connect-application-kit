/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './index.css';
import commercetoolsLogo from './commercetools.svg';

export const alertMessage = () => {
  alert('Hello! You are now using the Connect Asset Application template!');
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Connect Asset Application Template</h2>
    <a href="https://docs.commercetools.com/connect/" target="_blank">
      <img src="${commercetoolsLogo}" class="logo commercetools" alt="Commercetools logo" />
    </a>
  </div>
`;

setTimeout(alertMessage, 2500);
