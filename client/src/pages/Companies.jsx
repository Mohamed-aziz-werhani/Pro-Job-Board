import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CompanyCard, CustomButton, Header, ListBox } from "../components";
import { companies } from "../utils/data";
import axios from "axios";
import CompanyCard1 from "../components/CompanyCard1";

const Companies = () => {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [data, setData] = useState(companies ?? []);
  const [data1, setData1] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [cmpLocation, setCmpLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  const [num,setNum]=useState(0);

  const handleSearchSubmit = () => {
   // getData1();
  };
  const handleShowMore = () => {
    
  };
  const getData1=async ()=>{

    const companys=await axios.get("http://localhost:3003/v1/companies/");
    setData1( companys.data.data)
    console.log( data1)
  }

  useEffect(()=>{
    getData1();


  },[num])

  const incrementNum=()=>{
    setNum(x=>x+1);
  }

  return (
    <div className='w-full'>
      <Header
        title='Find Your Dream Company'
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={setSearchQuery}
      />

      <div className='container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 md:px-0 py-6 bg-[#f7fdfd]'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm md:text-base'>
            Shwoing: <span className='font-semibold'>1,902</span> Companies
            Available
          </p>

          <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
            <p className='text-sm md:text-base'>Sort By:</p>

            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>
        <div className='flex justify-end mb-4'>
          <button
            onClick={incrementNum}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            Get Companies
          </button>
        </div>
        <div className='w-full flex flex-col gap-6'>
          {data1?.map((cmp, index) => (
            <CompanyCard1 cmp={cmp} key={index} />
          ))}

          {isFetching && (
            <div className='mt-10'>
              <Loading />
            </div>
          )}

          <p className='text-sm text-right'>
            {data1?.length} records out of {recordsCount}
          </p>
        </div>

        {numPage > page && !isFetching && (
          <div className='w-full flex items-center justify-center pt-16'>
            <CustomButton
              onClick={handleShowMore}
              title='Load More'
              containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
