import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const ReportsManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: reports = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports`);
      return res.data;
    },
  });
  const navigate = useNavigate();
  // console.log(reports);

  const handleDeleteLesson = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this Lesson!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/lessons/${id}`);

          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "The lesson has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        }
      }
    });
  };
  const handleIgnoreLesson = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Ignore this Lesson!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Ignore it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/reports/${id}`);

          if (res.data) {
            Swal.fire({
              title: "Ignored!",
              text: "The lesson has been Ignored.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        }
      }
    });
  };

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
                  <td className="flex gap-5">
                    <button
                      onClick={() =>
                        navigate(`/all-lessons/${report?.lessonId}`)
                      }
                      className="btn rounded-xl text-white bg-emerald-700"
                    >
                      {" "}
                      View{" "}
                    </button>
                    <button
                      onClick={() => handleIgnoreLesson(report?._id)}
                      className="btn rounded-xl text-white bg-amber-700"
                    >
                      Ignore
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(report?.lessonId)}
                      className="btn rounded-xl text-white bg-rose-700"
                    >
                      Delete
                    </button>
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
