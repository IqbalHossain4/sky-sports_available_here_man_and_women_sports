import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
const useCourse = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://assignment-12-server-gamma.vercel.app/selectCourse?email=${user?.email}`
      );
      return res.json();
    },
  });
  return [cart, refetch];
};

export default useCourse;
