import { useState, useEffect, useRef } from 'react';

export function useLineGrowthOnScroll() {
    const [lineHeight, setLineHeight] = useState(0);
    const containerRef = useRef(null);
    const maxHeightReachedRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            
            const containerTop = containerRef.current.getBoundingClientRect().top;
            const containerHeight = containerRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate how far we've scrolled into the container
            // Negative containerTop means we've scrolled past the top of the container
            const scrolledIntoContainer = Math.max(0, Math.min(containerHeight, -containerTop + windowHeight * 0.5));
            
            // Calculate the line height as a percentage of how far we've scrolled 
            // through the container (adjusted to reach 99% when fully scrolled)
            const percentage = (scrolledIntoContainer / containerHeight) * 99;
            
            // Only update if the new height is larger than the previous maximum
            if (percentage > maxHeightReachedRef.current) {
                maxHeightReachedRef.current = percentage;
                setLineHeight(Math.min(96, percentage));
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        // Initial calculation
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { lineHeight, containerRef };
}

export function useElementVisibility(count = 1) {
    const [visibleElements, setVisibleElements] = useState(Array(count).fill(false));
    const elementRefs = Array(count).fill(0).map(() => useRef(null));
    
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the element is visible
        };

        // Create observer instances for each element
        const observers = elementRefs.map((ref, index) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Update only the specific element that is now visible
                        setVisibleElements(prev => {
                            const updated = [...prev];
                            updated[index] = true;
                            return updated;
                        });
                        
                        // Once we've shown the element, no need to keep observing
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Start observing
            if (ref.current) {
                observer.observe(ref.current);
            }
            
            return observer;
        });

        // Cleanup function to disconnect all observers
        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, [count]);

    return { visibleElements, elementRefs };
} 