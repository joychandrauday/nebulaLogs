import React from 'react';
import Webcam from 'react-webcam';

const VideoDialog = ({ isVisible, startRecording, stopRecording, videoUrl, webcamRef, recording, onClose, onVideoRecorded }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000080] z-50">
      <div className="bg-[#1E3A8A] p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute z-50 top-2 right-2 p-2 bg-[#EF4444] text-white rounded-full"
        >
          X
        </button>
        <button
          onClick={startRecording}
          className="absolute z-50 top-2 right-16 p-2 bg-[#10B981] text-white rounded-full"
          disabled={recording}
        >
          Start
        </button>
        <button
          onClick={stopRecording}
          className="absolute z-50 top-2 right-28 p-2 bg-[#EF4444] text-white rounded-full"
        >
          Stop
        </button>
        <div className={`absolute top-2 left-2 ${recording ? 'bg-red-600' : 'bg-gray-400'} w-4 h-4 rounded-full animate-ping`} />
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-[300px]"
        />
        {videoUrl && (
          <div className="mt-4">
            <video
              src={videoUrl}
              controls
              className="w-full rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDialog;
