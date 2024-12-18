import { useEffect } from 'react';

const calculateVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export const useResizeHeight = () => {
  useEffect(() => {
    calculateVH();
    window.addEventListener('resize', calculateVH);

    return () => window.removeEventListener('resize', calculateVH);
  }, []);
};
