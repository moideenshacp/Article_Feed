import React from "react";

interface InputFieldProps {
    label?:string,
    type?:string
    id?:string,
    name?: string; 
    placeholder?:string
    required?:boolean
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void
    value?:string
}


const InputField : React.FC<InputFieldProps> = ({ label, type, id, placeholder,name, required = false,onChange ,value}) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={id}
          name={name ||id}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          required={required}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  };
  
  export default InputField;