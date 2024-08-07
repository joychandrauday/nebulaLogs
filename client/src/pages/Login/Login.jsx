import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import rocket from '../../assets/images/1 (2).png';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

const Login = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { signInWithGoogle, signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const registrationDate = new Date().toISOString();
  const handleGoogleSign = async () => {
    try {
      const res = await signInWithGoogle();
      const userInfo = {
        id: uuidv4(), // Generate a unique ID for the user
        name: res.user?.displayName,
        email: res.user?.email,
        image_url: res.user?.photoURL,
        role: "passanger",
        registrationDate
      };

      const response = await axiosPublic.post(`/users`, userInfo);

      if (response.data.insertedId) {
        toast.success("Signup Successful");
        navigate(location?.state ? location.state : "/");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error.message);
    }
  };

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        navigate("/");
        toast("You are logged in!!");
      })
      .catch((error) => {
        toast("Invalid credentials!!");
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-icon bg-contain bg-no-repeat bg-black text-[#F9FAFB]">
      {/* Floating Sci-Fi Icon */}
      <div className="absolute top-8 right-8">
        <motion.div
          animate={{ y: ["0%", "-20%", "0%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF0081] to-[#FF8C00] shadow-lg"
        >
          <img src={rocket} alt="" className="w-16" />
        </motion.div>
      </div>

      <div className="p-10 backdrop-blur-sm rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h2 className="text-4xl font-orbitron text-center mb-5 text-[#F9FAFB]">
          Log In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 text-[#0F172A] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          <div className="mb-6">
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 text-[#0F172A] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition duration-300"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500">Password is required</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#00BFFF] rounded-lg text-xl font-bold hover:bg-[#1E90FF] transition-colors duration-300"
          >
            Log In
          </button>
        </form>

        {/* Social Log In Buttons */}
        <div className="mt-6 flex flex-col items-center space-y-4">
          <p className="text-center text-lg">Or log in with</p>
          <div className="flex space-x-4">
            <button
              onClick={handleGoogleSign}
              className="w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <FaGoogle className="text-3xl" />
            </button>
          </div>
        </div>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#00BFFF] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
