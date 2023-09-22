export const Button: React.FC<React.PropsWithChildren & HTMLButtonElement> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`text-2xl font-bold text-black bg-white rounded hover:bg-gray-200 p-2 disabled:bg-gray-500 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
