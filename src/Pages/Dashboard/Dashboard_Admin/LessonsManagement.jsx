import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const LessonsManagement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { refetch, data: lessons = [] } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-lessons`);
      return res.data;
    },
  });

  const handleDeletePost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this post!",
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
              text: "Your post has been deleted.",
              icon: "success",
            });
            refetch(); // 👈 don’t forget this
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
              <th>Lessons Name</th>
              <th>Users Name</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, idx) => {
              return (
                <tr key={idx}>
                  <th> {idx + 1} </th>
                  <td
                    className="leading-tight 
               whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {lesson.title}
                  </td>
                  <td> {lesson.creatorName} </td>
                  <td> {lesson.category} </td>
                  <td className="flex flex-row gap-5">
                    <button
                      onClick={() => navigate(`/all-lessons/${lesson?._id}`)}
                      className="btn bg-sky-700 text-white"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeletePost(lesson?._id)}
                      className="btn bg-amber-700 text-white"
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

export default LessonsManagement;
