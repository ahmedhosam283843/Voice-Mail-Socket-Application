import React,{ useState, useRef } from "react";
import RecordRTC from "recordrtc";
import Topbar from "./mailbox/Topbar";
import './compose.css'
import getSocket from "./socket";

const Compose = () => {

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    subject: "",
  });

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recordedAudioDuration, setRecordedAudioDuration] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const chunksRef = useRef([]);
  const startTimeRef = useRef(0);

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
  };

  // Handle delete record button click
  const handleDeleteRecord = () => {
    setRecordedAudio(null);
    setRecordedAudioDuration(0);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const socket = getSocket(localStorage.getItem("token"));
    if (recordedAudio) {
      try {
        const audio = audioPlayerRef.current;
        const audioContext = new AudioContext();
        const audioSource = audioContext.createMediaElementSource(audio);
        const destinationNode = audioContext.createMediaStreamDestination();
        audioSource.connect(destinationNode);
        const mediaRecorder = new RecordRTC(destinationNode.stream, {
          type: "audio",
          mimeType: "audio/mp3", // or 'audio/wav'
          desiredSampRate: 16000,
        });
        mediaRecorder.startRecording();
        audio.play();
        setTimeout(() => {
          mediaRecorder.stopRecording(() => {
            const blob = mediaRecorder.getBlob();
            const mailData = {
              to: formData.to, //client 2
              subject: formData.subject,
              message: blob,
              date_time: new Date().toISOString(),
          
            };
            socket.emit("sendMail",mailData);
          });
        }, recordedAudioDuration);
      } catch (err) {
        alert("Already Submited!!!");
      }
    }
  };
  return <>
    <div className="mailbox-Container">

      <Topbar />
      <div className="mainScreen">
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
      </div>
    </div>

  </>;
};

export default Compose;
