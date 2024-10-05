'use client';

import { useState } from 'react';

export default function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {children(setError)}
    </>
  );
}