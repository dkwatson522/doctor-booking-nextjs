"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import DoctorDetail from '../_components/DoctorDetail'
import DoctorSuggestionList from '../_components/DoctorSuggestionList';

function Details({ params }) {
  const [doctor, setDoctor] = useState();

  useEffect( ()=>{
    getDoctorById();
  },[])

  const getDoctorById = () => {
    GlobalApi.getDoctorById(params.recordId).then(response=>{
      setDoctor(response.data);
    })
  }

  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-[22px]">Details</h2>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        {/* Doctor Details */}
        <div className="col-span-3">
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>
        {/* Suggested Doctor List */}
        <div>
          {doctor && <DoctorSuggestionList doctor={doctor} />}
        </div>
      </div>
    </div>

  )
}

export default Details
