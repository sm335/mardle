import { useState, useEffect, useRef } from 'react';

export default function Confetti() {
    const confettiElement = useRef(null);
    const [showAnimation, setShowAnimation] = useState(true);
  
    useEffect(() => {
        const confettiCanvas = confettiElement.current;
        if (!confettiCanvas) return;
    
        const ctx = confettiCanvas.getContext("2d");
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    
        const confettis = [];
        const colors = ["#FF3F8D", "#8A00FF", "#00FF87", "#FFB700", "#00D1FF", "#FF4C00", "#6A1B9A", "#00FFB3"];
    
        const createConfetti = () => ({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 5 + 2,
            rotation: Math.random() * 360,
        });
    
        for (let i = 0; i < 100; i++) {
            confettis.push(createConfetti());
        }
    
        const animateConfetti = () => {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
            confettis.forEach((confetti, index) => {
            confetti.x += confetti.speedX;
            confetti.y += confetti.speedY;
            confetti.rotation += confetti.speedX;
    
            ctx.save();
            ctx.translate(confetti.x, confetti.y);
            ctx.rotate((confetti.rotation * Math.PI) / 180);
            ctx.fillStyle = confetti.color;
            ctx.fillRect(-confetti.size / 2, -confetti.size / 2, confetti.size, confetti.size);
            ctx.restore();
    
            if (confetti.y > confettiCanvas.height) {
                confettis.splice(index, 1);
            }
            });
    
            if (confettis.length > 0) {
            requestAnimationFrame(animateConfetti);
            }
        };
    
        const animationId = requestAnimationFrame(animateConfetti);
    
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);
  
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowAnimation(false);
        }, 15000);
    
        return () => clearTimeout(timeoutId);
    }, []);
  
    return showAnimation ? (
        <canvas
            ref={confettiElement}
            className="fixed left-0 top-0 w-[100vw] h-[100vh] z-20 pointer-events-none"
        />
    ) : null;
};