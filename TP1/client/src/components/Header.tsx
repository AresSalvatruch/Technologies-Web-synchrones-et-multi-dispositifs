// src/components/Header.tsx
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

const Header = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center space-x-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold mt-4">Bienvenue</h1>
      <p>Ceci est un test avec Vite + React + TypeScript</p>
    </header>
  );
};

export default Header;
