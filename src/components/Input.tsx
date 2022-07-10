import React from 'react';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<IInputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className="px-2 py-1 w-full bg-white border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-300 hover:border-sky-300 focus:ring-sky-100 sm:text-sm focus:ring-1"
        {...props}
      />
    </div>
  );
};

export default Input;
