import React from 'react';
import NavBar from './NavBar.jsx';

function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(() => document.documentElement.classList.contains('dark'));
  React.useEffect(() => {
    const cls = document.documentElement.classList;
    if (isDark) { cls.add('dark'); localStorage.setItem('theme', 'dark'); }
    else { cls.remove('dark'); localStorage.setItem('theme', 'light'); }
  }, [isDark]);
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setIsDark(d => !d)}
      className="btn-ghost rounded-full p-2"
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <NavBar rightSlot={<ThemeToggle />} />
      <main className="container container-narrow py-6">{children}</main>
    </div>
  );
}
