import React from 'react'

import { Template } from './template'


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







export const AddonComponent = () => {
  return (
    <div>
      <div>
        <div>
          Qué es un addon?
          Quieres descubrir algun addon especial
        </div>
        <div>
          Estos son tus addons disponibles
          <div>
            Instalado ...
            -- Paquetes
            Instalandose ....
            -- Paquetes
          </div>
        </div>
        <div>
          Cuantos addons tienes por instalar

          Estructura del addon

          Descubre addons por defecto
        </div>
      </div>
      <div>
        <Template />
      </div>
    </div>
  )
}