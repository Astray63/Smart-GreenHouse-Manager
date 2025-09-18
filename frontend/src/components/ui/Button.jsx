import React from 'react';

export default function Button({ variant = 'primary', className = '', ...props }) {
  const base = 'btn';
  const style = variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
  return <button className={`${base} ${style} ${className}`} {...props} />;
}
