// src/hooks/useFormattedDate.js

import { useState, useEffect } from 'react';

const useFormattedDate = (isoDate) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (isoDate) {
      const datePart = isoDate.split('T')[0];
      const creationDate = datePart.replace(/-/g, '').slice(2); 
      setFormattedDate(creationDate);
    }
  }, [isoDate]);

  return formattedDate;
};

export default useFormattedDate;
