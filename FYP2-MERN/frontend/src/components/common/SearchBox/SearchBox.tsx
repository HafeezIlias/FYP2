import React from 'react';
import { Search } from 'lucide-react';
import { BaseComponentProps } from '../../../types';
import './SearchBox.css';

interface SearchBoxProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  className = '',
  style
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const searchClasses = [
    'search-box',
    disabled ? 'search-box--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={searchClasses} style={style}>
      <div className="search-box__icon">
        <Search size={16} />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="search-box__input"
      />
    </div>
  );
};