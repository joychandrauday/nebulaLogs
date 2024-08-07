import React, { useContext, useEffect, useState } from "react";
import bgtext from "../../assets/images/codifyformatter11.png";
import contact from "../../assets/images/1 (3).png";
import help from "../../assets/images/1 (6).png";
import newlog from "../../assets/images/1 (7).png";
import secret from "../../assets/images/1 (4).png";
import { AuthContext } from "../../providers/AuthProvider";
import useUser from "../../hooks/useUser";
import getCurrentActivationDay from "../../hooks/getCurrentActivationDay";
import scifiBox from "../../assets/images/scifiBox.png";
const BannerElements = () => {
  const { user, logOut } = useContext(AuthContext);
  const { userdb } = useUser();
  const [creationDate, setCreationDate] = useState(null);
  const [sol, setSol] = useState(null);

  useEffect(() => {
    if (userdb?.registrationDate) {
      // Extracting the date in YYYY-MM-DD format
      const registerDate = new Date(userdb.registrationDate);
      const formattedDate = registerDate.toISOString().split("T")[0];
      setCreationDate(formattedDate);
    }
  }, [userdb]);

  useEffect(() => {
    if (creationDate) {
      try {
        const sol = getCurrentActivationDay(creationDate);
        setSol(sol);
      } catch (error) {
        console.error(error);
      }
    }
  }, [creationDate]);

  console.log(userdb);
  console.log(creationDate);
  console.log(sol);

  return (
    <div>
      <section
        className="relative h-screen flex items-center justify-center bg-cover flex-row bg-center gap-8"
        style={{ backgroundImage: "url('https://iili.io/dAczB8x.jpg')" }}
      >
        <div className="p-6 relative flex items-center justify-center z-10">
          <img src={scifiBox} alt="" className="absolute -top-12 left-0 w-full  blur-sm" />
          <img src={scifiBox} alt="" className="absolute -top-12 left-0 w-full " />
          <div className="text-center flex items-center justify-center z-10">
            <div className="wrap p-8">
              <h1 className="text-5xl   font-orbitron text-white font-cool">
                Welcome to Nebula Logs
              </h1>
              <p className="text-xl text-[#EC4899] ">
                Log Your Journey Through the Cosmos
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-16 z-10">
          {user ? (
            <>
              <a
                href="/logs"
                className="relative w-[150px] h-24 flex items-center justify-center hover:-translate-x-6 transition-transform text-font hover:text-yellow-400 text-xl font-audio"
                style={{
                  backgroundImage: `url(${bgtext})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <img
                  src={secret}
                  className="invert w-8 mr-2 absolute top-2 right-0"
                  alt=""
                />
                My Logs
              </a>
              <a
                href="/new"
                className="relative w-[150px] h-24 flex items-center justify-center hover:-translate-x-6 transition-transform text-font hover:text-yellow-400 text-xl font-audio"
                style={{
                  backgroundImage: `url(${bgtext})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <img
                  src={newlog}
                  className="invert w-8 mr-2 absolute top-2 right-0"
                  alt=""
                />
                New Log
              </a>
              <a
                href="/help"
                className="relative w-[150px] h-24 flex items-center justify-center hover:-translate-x-6 hover:shadow-lg shadow-black transition-transform text-font hover:text-yellow-400 text-xl font-audio"
                style={{
                  backgroundImage: `url(${bgtext})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <img
                  src={help}
                  className="invert w-8 mr-2 absolute top-2 right-0"
                  alt=""
                />
                Helpline
              </a>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="relative w-[150px] h-24 flex items-center justify-center hover:-translate-x-6 transition-transform text-font hover:text-yellow-400 text-xl font-audio"
                style={{
                  backgroundImage: `url(${bgtext})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                Log In
              </a>
              <a
                href="/signup"
                className="relative w-[150px] h-24 flex items-center justify-center hover:-translate-x-6 transition-transform text-font hover:text-yellow-400 text-xl font-audio"
                style={{
                  backgroundImage: `url(${bgtext})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                Sign Up
              </a>
            </>
          )}
        </div>
        {user && (
          <>
            <div className="wrap">
              <div className="absolute bottom-8 right-16 z-10 backdrop-blur-sm  border border-primary px-4 py-1">
                <div className=" text-white">
                  <div className="wrap flex gap-3 justify-between">
                    <div>SOL : {sol}</div>
                    <div className="">on board: {creationDate}</div>
                  </div>
                  
                </div>
              </div>
              <div className="absolute bottom-8 right-16 z-10 backdrop-blur-sm  border border-primary px-4 py-1">
                <div className=" text-white">
                  <div className="wrap flex gap-3 justify-between">
                    <div>SOL : {sol}</div>
                    <div className="">on board: {creationDate}</div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="absolute top-8 left-16 z-10 backdrop-blur-sm px-4 border border-primary">
              <div className="flex wrap gap-4 items-center justify-between">
                <img
                  src={user?.photoURL}
                  alt=""
                  className="w-16 p-1 rounded-full group-hover:scale-110"
                />
                <button
                  onClick={logOut}
                  className="relative w-[100px] h-24 flex items-center justify-center hover:translate-x-2 hover:shadow-lg shadow-black transition-transform text-font hover:text-red-900 text-md font-audio"
                  style={{
                    backgroundImage: `url(${bgtext})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  Sign out
                </button>
              </div>
              <div className="text-white">{userdb?.code}</div>
            </div>
            <div className="absolute top-8 left-16 z-10 backdrop-blur-sm px-4 border border-primary">
              <div className="flex wrap gap-4 items-center justify-between">
                <img
                  src={user?.photoURL}
                  alt=""
                  className="w-16 p-1 rounded-full group-hover:scale-110"
                />
                <button
                  onClick={logOut}
                  className="relative w-[100px] h-24 flex items-center justify-center hover:translate-x-2 hover:shadow-lg shadow-black transition-transform text-font hover:text-red-900 text-md font-audio"
                  style={{
                    backgroundImage: `url(${bgtext})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  Sign out
                </button>
              </div>
              <div className="text-white">{userdb?.code}</div>
            </div>
          </>
        )}
        <div className="z-0 absolute inset-0 bg-black bg-opacity-40"></div>
      </section>
    </div>
  );
};

export default BannerElements;
