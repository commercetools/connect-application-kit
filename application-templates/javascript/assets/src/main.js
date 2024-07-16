import commercetoolsLogo from '../static/commercetools.svg';
import './index.css';

export const alertMessage = () => {
  alert('Hello! You are now using the Connect Asset Application template!');
};

// Get the anchor tag and set the image source
document.addEventListener('DOMContentLoaded', () => {
  const imgElement = document.createElement('img');
  imgElement.src = commercetoolsLogo;
  imgElement.className = 'logo';
  imgElement.alt = 'CT logo';

  const linkElement = document.querySelector('a');
  if (linkElement) {
    linkElement.appendChild(imgElement);
  }
});

setTimeout(alertMessage, 1000);
