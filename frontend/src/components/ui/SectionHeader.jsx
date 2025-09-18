import React from 'react';

export default function SectionHeader({ title, actions }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="section-title">{title}</h1>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
