// src/components/ChipInput.tsx
import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import './ChipInput.css';

interface ChipInputProps {
  items: string[];
}

const ChipInput: React.FC<ChipInputProps> = ({ items }) => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setChips([...chips, inputValue.trim()]);
      setInputValue('');
    } else if (event.key === 'Backspace' && inputValue === '') {
      setChips((prevChips) => {
        const updatedChips = [...prevChips];
        updatedChips.pop();
        return updatedChips;
      });
    }
  };

  const handleChipRemove = (chip: string) => {
    setChips((prevChips) => prevChips.filter((c) => c !== chip));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chips]);

  return (
    <div className="chip-input">
      <div className="chips-container">
        {chips.map((chip) => (
          <div key={chip} className="chip">
            {chip}
            <button onClick={() => handleChipRemove(chip)}>&times;</button>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter..."
      />
      <div className="suggestions">
        {items
          .filter((item) => !chips.includes(item) && item.toLowerCase().includes(inputValue.toLowerCase()))
          .map((item) => (
            <div key={item} className="suggestion" onClick={() => setChips([...chips, item])}>
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChipInput;