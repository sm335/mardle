'use client';

import { useState, useEffect } from "react";

export default function TimeUntilRefresh({ secondsLeft }) {
    const [timeLeft, setTimeLeft] = useState(parseInt(secondsLeft));
    const [formattedTime, setFormattedTime] = useState(null);

    const formatTime = (value) => {
        const hours = Math.floor(value / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((value % 3600) / 60).toString().padStart(2, '0');
        const seconds = (value % 60).toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        setTimeLeft((prevTimeLeft) => {
            if (prevTimeLeft - 1 >= 0) {
                setFormattedTime(formatTime(prevTimeLeft - 1));
                return prevTimeLeft - 1;
            } else {
                return 86400; // Ensure timeLeft is set to 0 when the timer ends
            }
        });


        const intervalId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft - 1 >= 0) {
                    setFormattedTime(formatTime(prevTimeLeft - 1));
                    return prevTimeLeft - 1;
                } else {
                    return 86400; // Ensure timeLeft is set to 0 when the timer ends
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="text-gray-400 mb-6">
            Time Until Refresh: {formattedTime}
        </div>
    );
};