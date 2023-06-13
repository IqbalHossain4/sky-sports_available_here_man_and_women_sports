import { useQuery } from "@tanstack/react-query";
import useAxiosSecures from "./useAxiosSecures";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const useAdmine = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecures();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      return res.data.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmine;
