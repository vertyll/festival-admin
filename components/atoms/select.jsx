import React from "react";

export default function Select({ options, value, onChange, defaultOption, className }) {
  return (
    <select value={value} onChange={onChange} className={className}>
      {defaultOption && <option value="">{defaultOption}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}