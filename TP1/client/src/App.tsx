// src/App.tsx
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
