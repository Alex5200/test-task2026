import { useEffect, useRef } from 'react';

const easeOutQuart = (t: number, b: number, c: number, d: number) => {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
};

export const useAnimatedCounter = (
    target: number,
    duration: number = 2000,
    decimals: number = 0,
    onEnd?: (finalValue: number) => void
) => {
    const ref = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (!ref.current) return;

        const start = parseFloat(ref.current.textContent || '0');
        const formattedTarget = parseFloat(target.toFixed(decimals));
        startTimeRef.current = performance.now();

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTimeRef.current;
            const value = easeOutQuart(elapsed, start, formattedTarget - start, duration);

            if (elapsed < duration && ref.current) {
                ref.current.textContent = value.toFixed(decimals);
                animationRef.current = requestAnimationFrame(step);
            } else {
                if (ref.current) {
                    ref.current.textContent = formattedTarget.toFixed(decimals);
                }
                if (onEnd) onEnd(formattedTarget);
            }
        };

        animationRef.current = requestAnimationFrame(step);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [target, duration, decimals, onEnd]);

    return ref;
};