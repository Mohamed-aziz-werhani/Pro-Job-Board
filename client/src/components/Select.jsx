 import React from "react";

 const Select =({setType})=>{
    return (
<div className='w-full'>
                          <label htmlFor="choix" className='mb-1 text-gray-600 text-sm'>Role:</label>
    <select id="choix" name="choix" className="mt-2 p-2 w-full h-10 border rounded" onChange={(e)=>{setType(e.target.value)}}> 
      <option value="CONDIDAT" >CONDIDAT</option>
    <option value="RECRUTEUR">RECRUTEUR</option>
    <option value="CEO">CEO</option>
        
    </select>
    </div>
    );
 }
 export default Select;