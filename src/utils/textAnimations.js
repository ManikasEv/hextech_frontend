import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Heading reveal — slides up from below on scroll.
 * Does NOT set opacity:0 at mount, so translated text is always visible.
 */
export function scrambleReveal(el, options = {}) {
    if (!el) return;
    const {
        duration = 0.65,
        delay = 0,
        start = 'top 90%',
        once = true,
    } = options;

    ScrollTrigger.create({
        trigger: el,
        start,
        once,
        onEnter: () => {
            gsap.fromTo(el,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration, delay, ease: 'power3.out' }
            );
        },
    });
}

/**
 * Subtitle / paragraph reveal — fades up on scroll.
 * Does NOT set opacity:0 at mount, so translated text is always visible.
 */
export function wordReveal(el, options = {}) {
    if (!el) return;
    const {
        y = 20,
        duration = 0.65,
        delay = 0,
        start = 'top 92%',
        once = true,
    } = options;

    ScrollTrigger.create({
        trigger: el,
        start,
        once,
        onEnter: () => {
            gsap.fromTo(el,
                { y, opacity: 0 },
                { y: 0, opacity: 1, duration, delay, ease: 'power3.out' }
            );
        },
    });
}

/**
 * Simple fade-up for any element.
 */
export function fadeUpReveal(el, options = {}) {
    if (!el) return;
    const {
        y = 30,
        duration = 0.7,
        ease = 'power2.out',
        delay = 0,
        start = 'top 88%',
        once = true,
    } = options;

    ScrollTrigger.create({
        trigger: el,
        start,
        once,
        onEnter: () => {
            gsap.fromTo(el,
                { y, opacity: 0 },
                { y: 0, opacity: 1, duration, ease, delay }
            );
        },
    });
}
