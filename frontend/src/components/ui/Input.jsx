import React from 'react';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block text-sm">
      {label && <span className="mb-1 block text-gray-600 dark:text-gray-300">{label}</span>}
      <input className={`input ${error ? 'border-red-500 focus:border-red-600 focus:ring-red-600' : ''} ${className}`} {...props} />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
