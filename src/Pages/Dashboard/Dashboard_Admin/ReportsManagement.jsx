import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ReportsManagement = () => {
    const axiosSecure = useAxiosSecure()
    const {data: reports = []} = useQuery({
        queryKey: ["reports"],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/reports`)
            return res.data
        }
    })
    return (
        <div>
               <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Lesson Title</th>
              <th>Repoted User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => {
              return (
                <tr key={idx}>
                    <td> {idx + 1} </td>
                    <td> {report.lessonTitle} </td>
                    <td> {report.reportedBy} </td>
                    <td className='flex gap-5'> 
                        <button className='btn rounded-xl text-white bg-emerald-700'> View </button>
                        <button className='btn rounded-xl text-white bg-rose-700'>Delete</button>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default ReportsManagement;