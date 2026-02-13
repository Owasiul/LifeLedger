import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const TopContributers = () => {
    const axiosSecure = useAxiosSecure()
    const {data: topContributers = []} = useQuery({
        queryKey: ["topContributers"],
        queryFn: async() =>{
            const res = await axiosSecure.get("/top-contributers")
            return res.data
        }
    })
    console.log(topContributers);
    return (
        <div>
            
        </div>
    );
};

export default TopContributers;