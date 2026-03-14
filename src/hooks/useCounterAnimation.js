import { useState, useEffect } from 'react';

export function useCounterAnimation(targetValue = 10, duration = 1200) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    // Calculate optimal step time based on target value and desired duration
    const stepTime = Math.max(30, Math.min(150, duration / targetValue));
    
    // Counter animation
    useEffect(() => {
        if (isVisible && count < targetValue) {
            const timer = setTimeout(() => {
                setCount(prevCount => {
                    // Accelerate counting for higher numbers if needed
                    const remaining = targetValue - prevCount;
                    const increment = remaining > targetValue / 2 ? 1 : 2;
                    return Math.min(targetValue, prevCount + increment);
                });
            }, stepTime);
            
            return () => clearTimeout(timer);
        }
    }, [count, isVisible, targetValue, stepTime]);
    
    return { count, isVisible, setIsVisible };
} 