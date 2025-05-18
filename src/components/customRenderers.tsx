import React from 'react';
import {
  rankWith,
  ControlProps,
  isControl,
  JsonFormsRendererRegistryEntry
} from '@jsonforms/core';
import {
  withJsonFormsControlProps
} from '@jsonforms/react';

interface CountryPercent {
  country: string;
  percent: number;
}

/**
 * Champ texte monoligne OU enum simple
 */
const TextOrEnumRenderer = ({ data, label, description }: ControlProps) => {
  if (!data) return null;

  return (
    <div className="question-row">
      <div className="question-label">
        {label}
        {description && (
          <div className="question-description">{description}</div>
        )}
      </div>
      <div className="answer-value">
        <span className="answer-badge">{data}</span>
      </div>
    </div>
  );
};

export const TextOrEnumControl = withJsonFormsControlProps(TextOrEnumRenderer);

export const TextOrEnumTester = rankWith(
  3,
  (uischema, schema) =>
    isControl(uischema) &&
    schema?.type === 'string' &&
    !uischema.options?.multi &&
    !!schema?.enum
);

/**
 * Champ texte multiligne
 */
const MultiLineRenderer = ({ data, label }: ControlProps) => {
  if (!data) return null;

  return (
    <div className="question-row" style={{ flexDirection: 'column' }}>
      <div className="question-label" style={{ width: '100%' }}>{label}</div>
      <div className="textarea-answer">{data}</div>
    </div>
  );
};

export const MultiLineControl = withJsonFormsControlProps(MultiLineRenderer);

export const MultiLineTester = rankWith(
  4,
  (uischema, schema) =>
    isControl(uischema) &&
    schema?.type === 'string' &&
    uischema.options?.multi === true
);

/**
 * Liste à choix multiple (array de strings enum)
 */
const MultipleEnumRenderer = ({ data, label }: ControlProps) => {
  if (!Array.isArray(data)) return null;

  return (
    <div className="question-row">
      <div className="question-label">{label}</div>
      <div className="answer-value">
        {data.map((value: string, index: number) => (
          <span key={index} className="answer-badge">{value}</span>
        ))}
      </div>
    </div>
  );
};

export const MultipleEnumControl = withJsonFormsControlProps(MultipleEnumRenderer);

export const MultipleEnumTester = rankWith(
  3,
  (uischema, schema) =>
    isControl(uischema) &&
    schema?.type === 'array' &&
    schema.items?.type === 'string' &&
    !!schema.items?.enum
);

/**
 * Affichage des pays avec pourcentages
 */
const CountryPercentRenderer = ({ data, label, description }: ControlProps) => {
  if (!Array.isArray(data)) return null;

  return (
    <div className="question-row" style={{ flexDirection: 'column' }}>
      <div className="question-label" style={{ width: '100%' }}>
        {label}
        {description && (
          <div className="question-description">{description}</div>
        )}
      </div>
      <table className="country-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Percent (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: CountryPercent, index: number) => (
            <tr key={index}>
              <td>{item.country}</td>
              <td>{item.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const CountryPercentControl = withJsonFormsControlProps(CountryPercentRenderer);

export const CountryPercentTester = rankWith(
  5,
  (uischema, schema) =>
    isControl(uischema) &&
    schema?.type === 'array' &&
    schema.items?.type === 'object' &&
    schema.items?.properties?.country &&
    schema.items?.properties?.percent
);

// Exporter tous les renderers et testeurs
export const customRenderers: JsonFormsRendererRegistryEntry[] = [
  { tester: TextOrEnumTester, renderer: TextOrEnumControl },
  { tester: MultiLineTester, renderer: MultiLineControl },
  { tester: MultipleEnumTester, renderer: MultipleEnumControl },
  { tester: CountryPercentTester, renderer: CountryPercentControl }
];

export const customCells = [];
