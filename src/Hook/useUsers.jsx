import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {
  async () => {
    const res = await axios("/users");
    console.log("res from axios", res, res.data);
    return res.data;
  };
};

export default useUsers;
