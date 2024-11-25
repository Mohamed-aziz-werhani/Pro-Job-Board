import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton, JobCard, JobTypes, TextInput } from "../components";
import { jobs } from "../utils/data";
import axios from 'axios'
import JobCard1 from "../components/JobCard1";
import { useSelector } from "react-redux";
const UploadJob1 = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const [errMsg, setErrMsg] = useState("");
  const [jobs1,setJob1]=useState([]);
  const [num,setNum]=useState(0);
  const {user}=useSelector((store)=>store.user);

  const [desc,setDesc]=useState("");
  const [rq,setRq]=useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [namecom,setNC]=useState("");


  const getJbos=async ()=>{
        const jobPost=await axios.get("http://localhost:3003/v1/jobs/");
        setJob1(jobPost.data.data);
        console.log(jobs1)
  }

  useEffect(()=>{
    getJbos();
  },[num])
 const incrementNum=()=>{
  setNum(x=>x+1);
 }
  const onSubmit = async (data) => {
   /* console.log( JSON.parse(window?.localStorage.getItem("userInfo"))) */
  const post= await axios.post(`http://localhost:3003/v1/jobs/createJ/${user?.id}`,{
    title:jobTitle,
    description:desc,
    Requirement:rq,
    namecom:namecom
   })
 console.log(post.data)
  };

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5'>
      <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
        <div>
          <p className='text-gray-500 font-semibold text-2xl'>Job Post</p>

          <form
            className='w-full mt-2 flex flex-col gap-8'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name='jobTitle'
              label='Job Title'
              placeholder='eg. Software Engineer'
              type='text'
              required={true}
              register={register("jobTitle", {
                required: "Job Title is required",
              })}
              error={errors.jobTitle ? errors.jobTitle?.message : ""}
              stocke={setJobTitle}
            />

<TextInput
              name='name of compnay'
              label='Name of Compnay'
              placeholder='Google'
              type='text'
              required={true}
              register={register('name of compnay', {
                required: "Job Title is required",
              })}
            
              stocke={setNC}
            />
        {/*les types des horaires de travail*/ /*
         <div className='w-full flex gap-4'>
              <div className={`w-1/2 mt-2`}>
                <label className='text-gray-600 text-sm mb-1'>Job Type</label>
                <JobTypes jobTitle={jobTitle} setJobTitle={setJobTitle} />
              </div>

              <div className='w-1/2'>
                <TextInput
                  name='salary'
                  label='Salary (USD)'
                  placeholder='eg. 1500'
                  type='number'
                  register={register("salary", {
                    required: "Salary is required",
                  })}
                  error={errors.salary ? errors.salary?.message : ""}
                />
              </div>
            </div>

            <div className='w-full flex gap-4'>
              <div className='w-1/2'>
                <TextInput
                  name='vacancies'
                  label='No. of Vacancies'
                  placeholder='vacancies'
                  type='number'
                  register={register("vacancies", {
                    required: "Vacancies is required!",
                  })}
                  error={errors.vacancies ? errors.vacancies?.message : ""}
                />
              </div>

              <div className='w-1/2'>
                <TextInput
                  name='experience'
                  label='Years of Experience'
                  placeholder='experience'
                  type='number'
                  register={register("experience", {
                    required: "Experience is required",
                  })}
                  error={errors.experience ? errors.experience?.message : ""}
                />
              </div>
            </div>

            <TextInput
              name='location'
              label='Job Location'
              placeholder='eg. New York'
              type='text'
              register={register("location", {
                required: "Job Location is required",
              })}
              error={errors.location ? errors.location?.message : ""}
            />
        */}
           
            <div className='flex flex-col'>
              <label className='text-gray-600 text-sm mb-1'>
                Description
              </label>
              <textarea
                className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                rows={4}
                cols={6}
                onChange={(e)=>{
                    setDesc(e.target.value)
                            }}
              ></textarea>
              
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600 text-sm mb-1'>
              Requirement
              </label>
              <textarea
                className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                rows={4}
                cols={6}
                onChange={(e)=>{
            setRq(e.target.value)
                    }}
              ></textarea>
            </div>

           
            <div className='mt-2'>
              <CustomButton
                type='submit'
                containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                title='Sumbit'
                onClick={onSubmit}
              />
            </div>
          </form>
        </div>
      </div>
      <div className='w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0'>
       <button 
    className='bg-blue-500 text-white px-4 py-2 my-4 rounded hover:bg-blue-600'
    onClick={incrementNum}
         >
             Get All Jobs
          </button>
        <p className='text-gray-500 font-semibold'>Recent Job Post</p>

        <div className='w-full flex flex-wrap gap-6'>
          {/*
            jobs.slice(0, 4).map((job, index) => {
              return <JobCard job={job} key={index} />;})
          })*/
            
              jobs1.slice(0,2).map((job, index) => {
                return <JobCard1 job={job} key={index} />;
              })
          }
        </div>
      </div>
    </div>
  );
};

export default UploadJob1;