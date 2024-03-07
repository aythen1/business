import React from 'react'



import {
  fetchsAddon,
  fetchAddon,
  addAddon,
  updateAddon,

  visionAddon,
  codeAddon,

  ayAddon,
  rpaAddon,
  dataAddon,
} from '@/actions/addon'

export const loadComponent = (componentPath) => {
  try {
    const Component = require(`${componentPath}`).default;
    return <Component />;
  } catch (error) {
    console.error(`Error loading component at path ${componentPath}:`, error);
    return null;
  }
};







