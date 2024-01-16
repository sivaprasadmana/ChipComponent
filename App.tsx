// src/App.tsx
import React from 'react';
import ChipInput from './components/ChipInput';

const App: React.FC = () => {
  const items = ['Nick Giannopoulos', 'John Doe', 'Jane Smith', 'Alice Johnson'];

  return (
    <div className="App">
      <h1>Chip Component Demo</h1>
      <ChipInput items={items} />
    </div>
  );
};

export default App;
