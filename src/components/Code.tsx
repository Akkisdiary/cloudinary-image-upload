import React from 'react';

const Code: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <code className="font-mono text-sm text-slate-700">{children}</code>
);

export default Code;
