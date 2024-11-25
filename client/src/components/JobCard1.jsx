import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

const JobCard1 = ({ job }) => {
  return (
    <Link to={`/job-detail/${job?.id}`}>
      <div
        className='w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg 
                rounded-md px-3 py-5 '
      >
        <div className='flex gap-3'>
          <img
            src={/**/`http://localhost:3003${job?.company?.image}`}
            alt={job?.company?.name}
            className='w-14 h-14'
           /* */
          />
 {/* <Link to={`/job-detail/${job?.id}`}></Link>*/}
          <div className=''>
            <p className='text-lg font-semibold truncate'>{job?.title}</p>
          </div>
        </div>

        <div className='py-3'>
          <p className='text-sm'>
            {job?.description.slice(0, 150) + "..."}
          </p>
        </div>

        <div className='flex items-center justify-between'>
          {/*<p className='bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm'>
            {job?.jobType}
          </p> */}
          <span className='text-gray-500 text-sm'>
            {moment(job?.created_at).fromNow()/*moment(job1?.created_at).fromNow()*/}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard1;
