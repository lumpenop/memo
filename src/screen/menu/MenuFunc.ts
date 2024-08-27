import React from 'react';

export const isFirstRender = (
  isFirst: boolean,
  setFunc: React.Dispatch<React.SetStateAction<boolean>>,
): boolean => {
  if (isFirst) {
    setFunc(!isFirst);
  }
  return isFirst;
};

export const increase = (prevCounter: string | null) => {
  if (prevCounter === null) return '';
  return `${prevCounter}1`;
};
