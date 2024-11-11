import React from "react";

const TextraInput = React.forwardRef(
    ({ placeholder, styles, label, name, error, stocke }, ref) => {
      return (
        <div className='flex flex-col mt-2'>
          <p className='text-gray-600 text-sm mb-1'>{label}</p>
  
          <textarea
            name={name}
            placeholder={placeholder}
            ref={ref}
            onChange={(e) => {
              stocke(e.target.value);
            }}
            className={`rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 ${styles}`}
            aria-invalid={error ? 'true' : 'false'}
            rows="2" // Par défaut, on spécifie 4 lignes, modifiable selon les besoins
          />
  
          {error && <span className='text-xs text-red-500 mt-0.5'>{error}</span>}
        </div>
      );
    }
  );
  
  export default TextraInput;