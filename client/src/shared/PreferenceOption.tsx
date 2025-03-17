import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PreferenceOptionProps{
    id:string,
    label:string
    icon:any
    onChange:any
}

const PreferenceOption :React.FC<PreferenceOptionProps>= ({ id, label, icon,onChange }) => {
    return (
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="peer absolute opacity-0 h-0 w-0"
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className="flex flex-col items-center p-4 border-2 rounded-lg border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50 peer-checked:border-indigo-500 peer-checked:bg-indigo-50"
        >
          <span className="text-gray-500 mb-2">{icon}</span>
          <span className="font-medium">{label}</span>
        </label>
      </div>
    );
  };
  
  export default PreferenceOption;