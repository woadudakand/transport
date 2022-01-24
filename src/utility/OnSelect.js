import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function OnSelect() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    setTimeout(() => {
      const getInput = document.querySelector('.ant-input');
      getInput && console.log(getInput.getAttribute('placeholder'));
    }, 500);
  }, [pathname]);

  return null;
}
