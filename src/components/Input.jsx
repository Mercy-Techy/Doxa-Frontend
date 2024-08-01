import { useState } from "react";

const Input = ({
  name,
  label,
  icon,
  type,
  style,
  inputRef,
  labelStyle,
  handleFn,
  ...rest
}) => {
  const [inputType, setInputType] = useState(type);
  const showPasswordHandler = () => {
    if (type === "password") {
      const newType = inputType === "password" ? "text" : "password";
      setInputType(newType);
    }
  };
  let content = (
    <input
      {...rest}
      name={name}
      type={inputType}
      ref={inputRef}
      onChange={handleFn}
      className={`p-4 bg-blue-50 rounded-lg mt-3 shadow-sm outline-none w-full ${style}`}
    />
  );
  if (icon) {
    content = (
      <>
        <input
          {...rest}
          name={name}
          type={inputType}
          ref={inputRef}
          onChange={handleFn}
          className={`p-4 bg-blue-50 rounded-lg mt-3 shadow-sm outline-none w-full ${style}`}
        />
        <img
          src={icon}
          alt=""
          className="w-[18px] h-[18px] absolute right-4 bottom-4"
          onClick={showPasswordHandler}
        />
      </>
    );
  }
  return (
    <div className="mt-8 relative">
      <label
        htmlFor={name}
        className={`${!labelStyle && "text-xl"} block ${labelStyle}`}
      >
        {label}
      </label>
      {content}
    </div>
  );
};

export default Input;
