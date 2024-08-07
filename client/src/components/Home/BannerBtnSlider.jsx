import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { motion } from "framer-motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./styles.css";

// import required modules
import { EffectCards } from "swiper/modules";

const BannerBtnSlider = () => {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper "
      >
        <SwiperSlide>
          <motion.div
            animate={{ y: ["0%", "-10%", "0%"] }} // Smooth vertical animation
            transition={{
              duration: 2, // Duration for smoother effect
              ease: "easeInOut", // Smooth easing
              repeat: Infinity,
              repeatType: "loop",
              delay: 3,
            }}
            className="flex-shrink-0 w-32 h-12 flex items-center justify-center rounded-md bg-gradient-to-r from-[#EC4899] to-[#C026D3] hover:bg-[#C026D3] transition-colors duration-300"
          >
            
          </motion.div>
        </SwiperSlide>
        <SwiperSlide>
          <motion.div
            animate={{ y: ["0%", "-10%", "0%"] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex-shrink-0 w-32 h-12 flex items-center justify-center rounded-md bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] hover:bg-[#5B21B6] transition-colors duration-300"
          >
            
          </motion.div>
        </SwiperSlide>
        <SwiperSlide>
          <motion.div
            animate={{ y: ["0%", "-10%", "0%"] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex-shrink-0 w-32 h-12 flex items-center justify-center rounded-md bg-gradient-to-r from-[#10B981] to-[#059669] hover:bg-[#059669] transition-colors duration-300"
          >
            
          </motion.div>
        </SwiperSlide>
        <SwiperSlide>
          <motion.div
            animate={{ y: ["0%", "-10%", "0%"] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex-shrink-0 w-32 h-12 flex items-center justify-center rounded-md bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:bg-[#D97706] transition-colors duration-300"
          >
            
          </motion.div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default BannerBtnSlider;
