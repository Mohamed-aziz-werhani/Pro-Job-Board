import { useEffect, useState } from "react";
import { Linkedin } from "../assets";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { jobs } from "../utils/data";
import { CustomButton, JobCard } from "../components";
import axios from "axios";

const JobDetail1 = () => {
    const {id } = useParams();
  
  const [job1, setJob1] = useState([]);
  const [selected, setSelected] = useState(true);
  const [num,setNum]=useState(0);
 const getJob1=async ()=>{
    const post=await axios.get(`http://localhost:3003/v1/jobs/${id}`);
    setJob1(post.data.data);
 }

 useEffect(()=>{
    getJob1();
  },[num])
 const incrementNum=()=>{
  setNum(x=>x+1);
  setSelected(true);
  console.log(job1);
 }
 
  /*useEffect(() => {
    setJob(jobs[id ?? 0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);*/

  return (
    <div className='container mx-auto'>
      <div className='w-full flex flex-col md:flex-row gap-10'>
        {/* LEFT SIDE */}
        <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
          <div className='w-full flex items-center justify-between'>
            <div className='w-3/4 flex gap-2'>
              <img
                src={`http://localhost:3003${job1?.company?.image}`}
                alt={job1?.company?.name}
                className='w-20 h-20 md:w-24 md:h-20 rounded'
              />

              <div className='flex flex-col'>
                <p className='text-xl font-semibold text-gray-600'>
                  {job1?.title}
                </p>

                <span className='text-base'>{job1?.company?.phone}</span>

                <span className='text-base text-blue-600'>
                  {job1?.company?.name}
                </span>

                <span className='text-gray-500 text-sm'>
                  {moment(job1?.created_at).fromNow()}
                </span>
              </div>
            </div>

        
          </div>

          

          <div className='w-full flex gap-4 py-5'>
            <CustomButton
              onClick={incrementNum}
              title='Job Description'
              containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                selected === "0"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            />

            <CustomButton
              onClick={() => setSelected(false)}
              title='Company'
              containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                selected === "1"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            />
          </div>

          <div className='my-6'>
            {selected  ? (
              <>
                <p className='text-xl font-semibold'>Job Decsription</p>

                <span className='text-base'>{job1?.description}</span>

              
                    <p className='text-xl font-semibold mt-8'>Requirement</p>
                    <span className='text-base'>
                      {job1?.Requirement}
                    </span>
                 
              </>
            ) : (
              <>
                <div className='mb-6 flex flex-col'>
                  <p className='text-xl text-blue-600 font-semibold'>
                    {job1?.company?.name}
                  </p>
            
                  <span className='text-sm'>{job1?.company?.email}</span>
                </div>

                <p className='text-xl font-semibold'>About Company</p>
                <span>{job1?.company?.about}</span>
              </>
            )}
          </div>

          <div className='w-full'>
            <CustomButton
              title='Apply Now'
              containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
            />
          </div>
        </div>

      
      
      </div>
    </div>
  );
};

export default JobDetail1;