/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface  CheckboxProps{
    id:string
    label:any
}


const Checkbox :React.FC<CheckboxProps> = ({ id, label }) => {
    return (
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      </div>
    );
  };
  
  export default Checkbox;