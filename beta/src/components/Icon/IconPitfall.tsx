/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {memo} from 'react';

export const IconPitfall = memo<JSX.IntrinsicElements['svg']>(
  function IconPitfall({className}) {
    return (
      <svg
        className={className}
        width="2em"
        height="2em"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M36 33C37.6569 33 39 31.6569 39 30C39 28.3431 37.6569 27 36 27C34.3431 27 33 28.3431 33 30C33 31.6569 34.3431 33 36 33Z"
          fill="currentColor"
        />
        <path
          d="M27 30C27 31.6569 25.6569 33 24 33C22.3431 33 21 31.6569 21 30C21 28.3431 22.3431 27 24 27C25.6569 27 27 28.3431 27 30Z"
          fill="currentColor"
        />
        <path
          d="M48 33C49.6569 33 51 31.6569 51 30C51 28.3431 49.6569 27 48 27C46.3431 27 45 28.3431 45 30C45 31.6569 46.3431 33 48 33Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M55.6975 54H42L25.7437 65.6116C23.7581 67.0299 21 65.6106 21 63.1704L21 54H16.3025C12.0466 54 8.37291 51.0213 7.69215 46.8201C6.88391 41.8322 6 35.1209 6 29.625C6 24.2196 6.85505 17.8522 7.65218 13.0906C8.34867 8.93026 12.0013 6 16.2195 6H55.7805C59.9987 6 63.6513 8.93026 64.3478 13.0906C65.1449 17.8522 66 24.2196 66 29.625C66 35.1209 65.1161 41.8322 64.3078 46.8201C63.6271 51.0213 59.9534 54 55.6975 54ZM27 48H16.3025C14.8404 48 13.8014 47.0112 13.6149 45.8604C12.8176 40.9398 12 34.619 12 29.625C12 24.7282 12.7875 18.7546 13.5698 14.0813C13.7555 12.9721 14.7674 12 16.2195 12L55.7805 12C57.2326 12 58.2445 12.9721 58.4302 14.0813C59.2125 18.7546 60 24.7282 60 29.625C60 34.619 59.1824 40.9398 58.3851 45.8604C58.1986 47.0112 57.1595 48 55.6975 48L40.0772 48L27 57.3409L27 48Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
