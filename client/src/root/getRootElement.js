const rootElId = 'react-root';

export const getRootElement = () => {
  const existRootEl = document.getElementById(rootElId);

  if (existRootEl) {
    return existRootEl;
  }

  const newRootEl = document.createElement('div');

  newRootEl.setAttribute('id', rootElId);
  document.body.appendChild(newRootEl);
  return newRootEl;
};
