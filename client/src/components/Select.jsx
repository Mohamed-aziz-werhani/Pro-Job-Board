 import React from "react";

 const Select =({setType})=>{
    return (
<div className='w-1/2'>
                          <label htmlFor="choix" className='mb-1 text-gray-600 text-sm'>Role:</label>
    <select id="choix" name="choix" className="mt-2 p-2 w-full h-10 border rounded" onChange={(e)=>{setType(e.target.value)}}> 
      <option value="condidat" >condidat</option>
    <option value="recruteur">recruteur</option>
    <option value="ceo">ceo</option>
        
    </select>
    </div>
    );
 }
 export default Select;