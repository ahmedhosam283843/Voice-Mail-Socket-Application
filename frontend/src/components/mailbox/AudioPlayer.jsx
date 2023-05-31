import React,{useRef, useEffect} from "react";


function AudioPlayer({ arrayBuffer }) {
    const audioRef = useRef(null);

    useEffect(() => {
        if (!arrayBuffer) return;

        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
        const audioURL = URL.createObjectURL(blob);
        audioRef.current.src = audioURL;

        return () => {
        URL.revokeObjectURL(audioURL);
        };
    }, [arrayBuffer]);

    return <audio ref={audioRef} controls />;
}

export default AudioPlayer;