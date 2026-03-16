import { useState, useEffect, useRef, memo } from 'react'
import { gsap } from 'gsap'
import ux from '../assets/ux.png'
import innovation from '../assets/innovate.png'
import T from './T'
import { useTranslation } from '../contexts/TranslationContext'
import { wordReveal } from '../utils/textAnimations'

// ── Inline SVG tech icons — official Simple Icons paths ──────────────────────
const icons = [
    {
        name: 'React',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#61DAFB" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>,
    },
    {
        name: 'HTML5',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>,
    },
    {
        name: 'Node.js',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#339933" d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.052-.19-.137-.24l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.087.05-.139.143-.139.241v10.15c0 .097.052.19.139.237l2.409 1.391c1.307.654 2.108-.116 2.108-.891V7.273c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.535c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.661.352-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.570.328.922.942.922 1.603v10.15c0 .661-.352 1.275-.922 1.604l-8.794 5.076c-.279.163-.600.247-.925.247zm2.718-6.993c-3.852 0-4.659-1.77-4.659-3.254 0-.142.114-.253.256-.253h1.138c.127 0 .233.092.253.217.172 1.161.683 1.747 3.012 1.747 1.855 0 2.644-.419 2.644-1.401 0-.566-.224-.986-3.095-1.268-2.400-.238-3.883-.766-3.883-2.684 0-1.769 1.490-2.822 3.989-2.822 2.807 0 4.198.975 4.373 3.066.006.07-.018.136-.063.186a.254.254 0 0 1-.184.08h-1.143a.253.253 0 0 1-.248-.206c-.274-1.216-.937-1.605-2.735-1.605-2.016 0-2.250.702-2.250 1.228 0 .638.277.824 3.001 1.184 2.698.355 3.977.859 3.977 2.756 0 1.907-1.592 3.009-4.367 3.009z"/></svg>,
    },
    {
        name: 'Tailwind',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>,
    },
    {
        name: 'Vite',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#646CFF" d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z"/></svg>,
    },
    {
        name: 'TypeScript',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#3178C6" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>,
    },
    {
        name: 'JavaScript',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>,
    },
    {
        name: 'NeonDB',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#00E599" d="M3.6 0A3.6 3.6 0 0 0 0 3.6v14.966c0 2.807 3.28 4.3 5.395 2.43L7.2 19.36V24l4.8-4.8h4.663A3.537 3.537 0 0 0 20.4 15.663V3.6A3.6 3.6 0 0 0 16.8 0zm0 2.4h13.2a1.2 1.2 0 0 1 1.2 1.2v12.063a1.137 1.137 0 0 1-1.137 1.137H11.4L9.6 18.6v-3.8H4.663a.463.463 0 0 1-.463-.463V3.6a1.2 1.2 0 0 1 1.2-1.2zm2.4 3.6v6l3.6-3.6 2.4 2.4 3.6-3.6v6h2.4V6h-2.4L12 9.6 9.6 7.2 6 10.8V6z"/></svg>,
    },
    {
        name: 'MongoDB',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#47A248" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>,
    },
    {
        name: 'Clerk',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#6C47FF" d="m21.47 20.829-2.881-2.881a.572.572 0 0 0-.7-.084 6.854 6.854 0 0 1-7.081 0 .576.576 0 0 0-.7.084l-2.881 2.881a.576.576 0 0 0-.103.69.57.57 0 0 0 .166.186 12 12 0 0 0 14.113 0 .58.58 0 0 0 .239-.423.576.576 0 0 0-.172-.453zm.002-17.668-2.88 2.88a.569.569 0 0 1-.701.084A6.857 6.857 0 0 0 8.724 8.08a6.862 6.862 0 0 0-1.222 3.692 6.86 6.86 0 0 0 .978 3.764.573.573 0 0 1-.083.699l-2.881 2.88a.567.567 0 0 1-.864-.063A11.993 11.993 0 0 1 6.771 2.7a11.99 11.99 0 0 1 14.637-.405.566.566 0 0 1 .232.418.57.57 0 0 1-.168.448zm-7.118 12.261a3.427 3.427 0 1 0 0-6.854 3.427 3.427 0 0 0 0 6.854Z"/></svg>,
    },
    {
        name: 'Netlify',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#00C7B7" d="M6.49 19.04h-.23L5.13 17.9v-.23l1.73-1.71h1.2l.15.15v1.2L6.5 19.04ZM5.13 6.31V6.1l1.13-1.13h.23L8.2 6.68v1.2l-.15.15h-1.2L5.13 6.31Zm9.96 9.09h-1.65l-.14-.13v-3.83c0-.68-.27-1.2-1.1-1.23-.42 0-.9 0-1.43.02l-.07.08v4.96l-.14.14H8.9l-.13-.14V8.73l.13-.14h3.7a2.6 2.6 0 0 1 2.61 2.6v4.08l-.13.14Zm-8.37-2.44H.14L0 12.82v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14Zm17.14 0h-6.58l-.14-.14v-1.64l.14-.14h6.58l.14.14v1.64l-.14.14ZM11.05 6.55V1.64l.14-.14h1.65l.14.14v4.9l-.14.14h-1.65l-.14-.13Zm0 15.81v-4.9l.14-.14h1.65l.14.13v4.91l-.14.14h-1.65l-.14-.14Z"/></svg>,
    },
    {
        name: 'Vercel',
        svg: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M24 22.525H0l12-21.05 12 21.05z"/></svg>,
    },
];

// ── Typewriter — isolated so its fast re-renders don't affect the marquee ────
const Typewriter = memo(({ phrases }) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const currentPhrase = phrases[loopNum % phrases.length];
        const shouldType   = !isDeleting && text.length < currentPhrase.length;
        const shouldDelete = isDeleting  && text.length > 0;

        const t = setTimeout(() => {
            if (shouldType) {
                setText(currentPhrase.substring(0, text.length + 1));
                setTypingSpeed(150);
            } else if (shouldDelete) {
                setText(currentPhrase.substring(0, text.length - 1));
                setTypingSpeed(75);
            } else if (isDeleting && text.length === 0) {
                setIsDeleting(false);
                setLoopNum(n => n + 1);
                setTypingSpeed(500);
            } else {
                setIsDeleting(true);
                setTypingSpeed(2000);
            }
        }, typingSpeed);
        return () => clearTimeout(t);
    }, [text, isDeleting, loopNum, typingSpeed, phrases]);

    return (
        <div className="text-4xl font-bold text-primary text-center mt-8 mb-4">
            {text}<span className="cursor-blink">_</span>
        </div>
    );
});

// ── Icon marquee — isolated so it never re-renders after mount ────────────────
const IconMarquee = memo(() => {
    const iconsRowRef     = useRef(null);
    const marqueeTrackRef = useRef(null);

    useEffect(() => {
        const track = marqueeTrackRef.current;
        const container = iconsRowRef.current;
        if (!track || !container) return;

        let marqueeAnim;

        const tid = setTimeout(() => {
            const REPEATS = 4;
            const oneSet = track.scrollWidth / REPEATS;
            if (oneSet <= 0) return;

            marqueeAnim = gsap.fromTo(
                track,
                { x: -oneSet },
                { x: 0, duration: 28, ease: 'none', repeat: -1 }
            );

            const iconEls = Array.from(track.querySelectorAll('.tech-icon'));
            const iconCount = icons.length;
            const containerW = container.offsetWidth;
            const center = containerW / 2;
            const iconOffsets = iconEls.map(el => el.offsetLeft + el.offsetWidth / 2);
            const startTime = performance.now();

            const ticker = gsap.ticker.add(() => {
                const trackX = gsap.getProperty(track, 'x');
                const t = (performance.now() - startTime) / 1000;

                iconEls.forEach((el, i) => {
                    const phase = (i % iconCount) * 0.52;
                    const y = Math.sin(t * 4.5 + phase) * 8;
                    const elCenter = iconOffsets[i] + trackX;
                    const dist = Math.abs(elCenter - center);
                    const ratio = Math.max(0, 1 - dist / center);
                    const scale = 0.6 + ratio * 0.4;
                    const opacity = 0.35 + ratio * 0.65;
                    el.style.transform = `translateY(${-y}px) scale(${scale})`;
                    el.style.opacity = opacity;
                    el.style.transformOrigin = 'center bottom';
                });
            });

            track._ticker = ticker;
        }, 150);

        return () => {
            clearTimeout(tid);
            if (track?._ticker) gsap.ticker.remove(track._ticker);
            marqueeAnim?.kill();
        };
    }, []);

    return (
        <div
            ref={iconsRowRef}
            className="w-full overflow-hidden mb-8 py-4"
            style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
        >
            <div ref={marqueeTrackRef} className="flex gap-8 w-max px-4" style={{ willChange: 'transform' }}>
                {[...Array(4)].flatMap(() => icons).map((icon, i) => (
                    <div
                        key={`${icon.name}-${i}`}
                        className="tech-icon flex flex-col items-center gap-1.5 cursor-default flex-shrink-0"
                    >
                        <div className="w-10 h-10 md:w-12 md:h-12">{icon.svg}</div>
                        <span className="text-[10px] text-gray-500 font-mono tracking-wide">{icon.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const sectionRef    = useRef(null);
    const imagesRef     = useRef(null);
    const subtitleRef   = useRef(null);

    const phrasesRaw = ["Web Development", "Mobile Development", "UI/UX Design"];
    const { language, translateText } = useTranslation();
    const [phrases, setPhrases] = useState(phrasesRaw);
    const heroImages = [ux, innovation];

    // GSAP entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from('.hero-typewriter', { y: -40, opacity: 0, duration: 0.8 })
              .from(imagesRef.current, { y: 50, opacity: 0, duration: 0.9 }, '-=0.4');

            wordReveal(subtitleRef.current, { y: 20, duration: 0.8, delay: 0.5, start: 'top 100%' });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Translate typewriter phrases
    useEffect(() => {
        let mounted = true;
        const hydratePhrases = async () => {
            if (language === 'en') { if (mounted) setPhrases(phrasesRaw); return; }
            const translated = await Promise.all(phrasesRaw.map(p => translateText(p, language)));
            if (mounted) setPhrases(translated);
        };
        hydratePhrases();
        return () => { mounted = false; };
    }, [language, translateText]);

    // Mobile image transition
    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
                setIsVisible(true);
            }, 500);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={sectionRef} className="w-full h-auto flex flex-col items-center bg-secondary pt-16">
            <div className="hero-typewriter">
                <Typewriter phrases={phrases} />
            </div>

            <div ref={imagesRef} className="hidden md:flex gap-8 h-[45vh] px-8 my-4">
                <img src={ux} alt="ux" className="h-full object-contain hover:scale-95 transition-all duration-300" />
                <img src={innovation} alt="Innovate" className="h-full object-contain hover:scale-95 transition-all duration-300" />
            </div>
            <div className="flex md:hidden h-[45vh] px-8 my-4">
                <div className={`w-full h-full transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                        src={heroImages[currentImageIndex]}
                        alt={currentImageIndex === 0 ? "ux" : "Innovate"}
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            <p ref={subtitleRef} className="text-white text-center max-w-2xl mx-auto mb-6 px-4 mt-4">
                <T>We are a team of experienced developers and designers who are passionate about creating beautiful and functional websites and mobile apps.</T>
            </p>

            {/* Icon marquee — isolated memo component, never re-renders */}
            <IconMarquee />
        </div>
    );
};

export default Hero;

