import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers';

import { customRenderers, customCells } from './components/customRenderers';

import schema from './schemas/schema';
import uischema from './schemas/uischema';

import './styles/global.css'; // Optionnel, pour tes styles globaux

// Exemple de données pour tester
const data = {
  user: {
    a08: "John Doe",
    a09: "React developer with 5 years of experience.\nSkilled in Typescript and Node.js.",
  },
  item: {
    s01: ["vendor", "subcontractor"],
    p02: "no",
    i01: [
      { country: "France", percent: 40 },
      { country: "Germany", percent: 30 },
      { country: "Spain", percent: 30 }
    ]
  }
};

const App = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center' }}>🧾 Profile Summary</h1>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={[...vanillaRenderers, ...customRenderers]}
        cells={[...vanillaCells, ...customCells]}
      />
    </div>
  );
};

export default App;
