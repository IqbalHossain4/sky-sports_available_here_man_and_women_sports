import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxiosSecures from "./useAxiosSecures";

const useAdmine = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecures();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmine;
