export const Button = ({ handleFn, children, styles }) => {
  return (
    <button
      className={`px-4 py-2 bg-white text-black rounded-2xl shadow ${styles}`}
      onClick={handleFn}
    >
      {children}
    </button>
  );
};

export const LimeButton = ({ handleFn, children, styles, ...rest }) => {
  return (
    <button
      {...rest}
      className={`px-4 py-2 bg-textlime font-bold text-black rounded-lg shadow ${styles}`}
      onClick={handleFn}
    >
      {children}
    </button>
  );
};
