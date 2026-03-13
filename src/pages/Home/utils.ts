export const renderColor = (value: number) => {
  return value >= 0 ? '#e15241' : '#33b066';
};

export const renderSign = (value: number) => {
  return value > 0 ? '+' : '';
};
