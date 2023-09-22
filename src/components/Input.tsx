export const Input: React.FC<Partial<HTMLInputElement> & { label: string }> = ({
  label,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input className="text-black text-2xl w-96 p-2 rounded" {...rest} />
    </div>
  );
};
