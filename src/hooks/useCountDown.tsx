import React, { useEffect, useRef, useState } from "react";

/**
 *
 * @param time is time in minutes to count down from
 */
export default function useCountDown(time: number) {
    const [currentTime, setCurrentTime] = useState(time * 60);
    const [isTiming, setIsTiming] = useState<boolean>(false);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
                timer.current = null;
            }
        };
    }, []);

    const stopTimer = () => {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
        setCurrentTime(time * 60);
        setIsTiming(true);
    };

    const startTimer = () => {
        setIsTiming(true);

        timer.current = setInterval(() => {
            setCurrentTime((prev) => {
                const rs = Math.max(0, prev - 1);
                if (rs == 0) {
                    stopTimer();
                }
                return rs;
            });
        }, 1000);
    };

    return {
        currentTime: (currentTime / 60).toFixed(2),
        stopTimer,
        startTimer,
        isTiming,
    };
}
