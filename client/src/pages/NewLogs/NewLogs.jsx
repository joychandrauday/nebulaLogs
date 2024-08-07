import React, { useState, useRef, useEffect } from "react";
import VideoDialog from "./VideoDialog"; // Import the VideoDialog component
import RecordRTC from "recordrtc";
import inputBg from "../../assets/images/inputBg.png";
import useUser from "./../../hooks/useUser";
import { number } from "prop-types";
import { imageUpload } from "../../api/utils";

// Function to fetch the current IP address
const fetchIpAddress = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return "";
  }
};

// Function to generate a random 5-digit number
const generateEventId = () => Math.floor(10000 + Math.random() * 90000);

const NewLogs = () => {
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State to handle selected image
  const { userdb } = useUser();
  const [formData, setFormData] = useState({
    level: "",
    message: "",
    eventId: generateEventId(), // Generate random 5-digit event ID
    user: {
      code: `${userdb?.code}`,
      email: `${userdb?.email}`,
      image: `${userdb?.image_url}`,
    },
    sessionId: "",
    stackTrace: "",
    hostname: "",
    ip: "",
    appVersion: "1.0",
    visuals: "", // Added for image
  });

  const [cameraOn, setCameraOn] = useState(false); // State to manage camera on/off
  const [dialogVisible, setDialogVisible] = useState(false); // State to manage dialog visibility
  const webcamRef = useRef(null);
  const recorderRef = useRef(null);

  // Fetch and set the IP address when the component mounts
  useEffect(() => {
    const getIpAddress = async () => {
      const ip = await fetchIpAddress();
      setFormData((prevData) => ({ ...prevData, ip }));
    };
    getIpAddress();
  }, []);

  // Start the camera
  const startCamera = () => {
    setCameraOn(true);
    setDialogVisible(true); // Show the video dialog
  };

  // Stop the camera
  const stopCamera = () => {
    setCameraOn(false);
    setDialogVisible(false); // Hide the video dialog
  };

  // Start recording
  const startRecording = () => {
    if (webcamRef.current && cameraOn) {
      const stream = webcamRef.current.stream;
      recorderRef.current = new RecordRTC(stream, {
        type: "video",
      });
      recorderRef.current.startRecording();
      setRecording(true);
    } else {
      alert("Please turn on the camera first.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current.getBlob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url); // Set the video URL to display it
        uploadVideo(blob); // Upload video and get URL
        setRecording(false);
      });
    }
  };

  // Upload the recorded video to the video hosting service
  const uploadVideo = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob, "recordedVideo.mp4");

      const response = await fetch("https://api.freevideohost.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload video");

      const data = await response.json();
      setUploadedVideoUrl(data.url); // Save the uploaded video URL
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      user: { ...prevData.user, [name]: value },
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Set selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Form Data:", formData); // Log form data to console
    const formDataToSubmit = new FormData();
    
    if (uploadedVideoUrl) {
      formDataToSubmit.append("videoUrl", uploadedVideoUrl);
    }
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "user") {
        Object.entries(value).forEach(([userKey, userValue]) => {
          formDataToSubmit.append(`user[${userKey}]`, userValue);
        });
      } else {
        formDataToSubmit.append(key, value);
      }
    });
    
    try {
      if (selectedImage) {
        await imageUpload(selectedImage);
      }
      formDataToSubmit.append("visuals", selectedImage);
      await fetch("/api/upload", {
        method: "POST",
        body: formDataToSubmit,
      });
      
      // Upload the selected image after form submission
      console.log(formData);
      alert("Log submitted successfully!");
    } catch (error) {
      console.error("Error submitting log:", error);
    }
  };

  // Close video dialog
  const handleCloseDialog = () => {
    setDialogVisible(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0F172A] text-[#F9FAFB]"
      style={{
        backgroundImage: "url('https://iili.io/d5czCiB.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
        <h2 className="text-3xl font-orbitron text-center mb-8">Submit Log</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Form fields */}
            {[
              "level",
              "message",
              "visuals",
              "attempt",
            ].map((field, index) => (
              <div
                key={index}
                className="mb-4 h-44 flex items-center justify-center flex-col"
                style={{
                  backgroundImage: `url(${inputBg})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              >
                <label className="block mb-2 text-xl" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "level" ? (
                  <select
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-2/4 bg-transparent backdrop-blur-md px-4 py-2 border-gray-400 border rounded focus:outline-none"
                    required
                  >
                    <option value="" disabled>
                      Select level
                    </option>
                    <option value="INFO">INFO</option>
                    <option value="WARN">WARN</option>
                    <option value="ERROR">ERROR</option>
                    <option value="DEBUG">DEBUG</option>
                  </select>
                ) : field === "attempt" ? (
                  <input
                    type='number'
                    id={field}
                    name={field}
                    value={formData[field] || formData.user[field]}
                    onChange={
                      field.includes("User") ? handleUserChange : handleChange
                    }
                    className="w-2/4 bg-transparent backdrop-blur-md px-4 py-2 border-gray-400 border rounded focus:outline-none"
                    
                  />
                ) : field === "visuals" ? (
                  <div>
                    <label htmlFor="image" className="block mb-2 text-sm">
                      Select Image:
                    </label>
                    <input
                      required
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange} // Handle image file change
                    />
                  </div>
                ) : (
                  <input
                    type={field.includes("Email") ? "email" : "text"}
                    id={field}
                    name={field}
                    value={formData[field] || formData.user[field]}
                    onChange={
                      field.includes("User") ? handleUserChange : handleChange
                    }
                    className="w-2/4 bg-transparent backdrop-blur-md px-4 py-2 border-gray-400 border rounded focus:outline-none"
                    required={
                      ![
                        "sessionId",
                        "stackTrace",
                        "hostname",
                        "appVersion",
                      ].includes(field)
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mb-6">
            <button
              type="button"
              onClick={startCamera}
              className="py-2 px-4 bg-[#10B981] rounded-lg text-xl font-bold hover:bg-[#059669] transition-colors duration-300"
            >
              Turn On Camera
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="ml-4 py-2 px-4 bg-[#EF4444] rounded-lg text-xl font-bold hover:bg-[#dc2626] transition-colors duration-300"
            >
              Turn Off Camera
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#10B981] rounded-lg text-xl font-bold hover:bg-[#059669] transition-colors duration-300"
          >
            Submit
          </button>
        </form>
        <VideoDialog
          isVisible={dialogVisible}
          startRecording={startRecording}
          stopRecording={stopRecording}
          videoUrl={videoUrl}
          webcamRef={webcamRef}
          recording={recording}
          onClose={handleCloseDialog}
        />
        {videoUrl && (
          <div className="mt-6">
            <h3 className="text-2xl mb-2">Recorded Video:</h3>
            <video
              src={videoUrl}
              controls
              className="w-full rounded-lg shadow-lg"
            ></video>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewLogs;
