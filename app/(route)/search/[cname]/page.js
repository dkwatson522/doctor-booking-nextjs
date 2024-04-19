"use client";
import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';

function Search({params}) {
  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    getDoctors()
  }, [])

  const getDoctors = () => {
    GlobalApi.getDoctorsByCategory(params.cname).then((response) => {
      setDoctors(response.data)
    })
  }
  return (
    <div className='mt-5'>
      <DoctorList doctorList={doctors} heading={params.cname.split('_').join(' ')} />
    </div>
  )
}

export default Search
