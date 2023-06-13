import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecures from "./useAxiosSecures";

const useInstructor = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecures();

  const { data: isInstructor, isLoading: isInsLoading } = useQuery({
    queryKey: ["isInstructor", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
      return res.data.instructor;
    },
  });
  return [isInstructor, isInsLoading];
};

export default useInstructor;
