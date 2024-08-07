import React, { useContext } from 'react';
import { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is being used for HTTP requests
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from '../providers/AuthProvider';

const useUser = () => {
    const { user} =useContext(AuthContext);
    const [userdb, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic=useAxiosPublic()
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axiosPublic.get(`/user/${user.email}`);
        setUser(response.data);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [axiosPublic, user]);

  return { userdb, loading, error };
};

export default useUser;