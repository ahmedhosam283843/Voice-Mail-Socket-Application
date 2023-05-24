import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";

const MyForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    subject: "",
  });

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [, setRecordedAudioDuration] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const chunksRef = useRef([]);
  const startTimeRef = useRef(0);
  const [byteArray, setByteArray] = useState(null);

  // Handle input changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Start recording audio
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedAudio(null);
    setRecordedAudioDuration(0);
    chunksRef.current = [];
    startTimeRef.current = Date.now();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.addEventListener(
          "stop",
          handleRecordingStopped
        );
        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  // Stop recording audio
  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.removeEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.removeEventListener(
        "stop",
        handleRecordingStopped
      );
    }
  };

  // Store recorded audio data in chunks
  const handleDataAvailable = (e) => {
    if (e.data.size > 0) {
      chunksRef.current.push(e.data);
    }
  };

  // Handle recording stopped event
  const handleRecordingStopped = () => {
    const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
    setRecordedAudio(URL.createObjectURL(audioBlob));
    const duration = Date.now() - startTimeRef.current;
    setRecordedAudioDuration(duration);
    convertToArrayBuffer(audioBlob);
  };

  // Convert audio blob to array buffer
  const convertToArrayBuffer = (blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setByteArray(reader.result);
    };
    reader.readAsArrayBuffer(blob);
  };

  // Handle recording again button click
  const handleRecordAgain = () => {
    setRecordedAudio(null);
    setRecordedAudioDuration(0);
    setByteArray(null);
  };

  // Handle delete record button click
  const handleDeleteRecord = () => {
    setRecordedAudio(null);
    setRecordedAudioDuration(0);
    setByteArray(null);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data for saving as a text file
    const dataArray = [
      `From: ${formData.from}`,
      `To: ${formData.to}`,
      `Subject: ${formData.subject}`,
      ...Array.from(new Uint8Array(byteArray)),
    ];
    const fileData = new Blob(dataArray, { type: "text/plain;charset=utf-8" });
    saveAs(fileData, "data.txt");
  };

  // Render the form and audio recorder
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">New Message</h2>
      <div className="form-group">
        <label htmlFor="from">From</label>
        <input
          type="text"
          id="from"
          name="from"
          value={formData.from}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="to">To</label>
        <input
          type="text"
          id="to"
          name="to"
          value={formData.to}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>Record Audio</label>
        <div className="audio-recorder">
          {recordedAudio ? (
            <>
              <div className="audio-controls">
                <div className="audio-buttons">
                  <button
                    type="button"
                    className="audio-control-btn"
                    onClick={handleRecordAgain}
                  >
                    Record Again
                  </button>
                  <button
                    type="button"
                    className="audio-control-btn"
                    onClick={handleDeleteRecord}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <audio ref={audioPlayerRef} src={recordedAudio} controls />
            </>
          ) : (
            <button
              type="button"
              className={`audio-record-btn ${isRecording ? "recording" : ""}`}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
            >
              <span className="record-button-text">
                {isRecording ? "Stop" : "Record"}
              </span>
              <span className="record-button-circle" />
            </button>
          )}
        </div>
      </div>
      <div className="form-group">
        <button type="submit" className="form-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default MyForm;
