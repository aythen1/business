import React from "react";

import { useState } from 'react';
import { QueryBuilderDnD } from '@react-querybuilder/dnd';
import * as ReactDnD from 'react-dnd';
import * as ReactDndHtml5Backend from 'react-dnd-html5-backend';

import { QueryBuilder } from 'react-querybuilder';
import { fields } from './fields';
import 'react-querybuilder/dist/query-builder.css';
import './SQL.css';

const initialQuery = { combinator: 'and', rules: [] };

export default ({ data }) => {
  const [query, setQuery] = useState(initialQuery);
  return (
    <>
      <div>
      <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={setQuery}
        listsAsArrays
        showCloneButtons
        showLockButtons
        showNotToggle
        controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
      />
    </QueryBuilderDnD>
      </div>
    </>
  );
};


