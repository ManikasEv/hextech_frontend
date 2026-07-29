import { memo, useEffect, useRef } from 'react';

// ── Global starfield backdrop ─────────────────────────────────────────────────
// Fixed behind the entire page (not just the hero) so the twinkling/drifting
// stars stay put as a constant backdrop while every section scrolls over them.
const Starfield = memo(() => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let raf;
        let width, height, dpr;
        let stars = [];
        let shootingStars = [];
        let nextShootingStarAt = 0;

        const STAR_COUNT = 220;

        const buildStars = () => {
            stars = Array.from({ length: STAR_COUNT }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 1.3 + 0.3,
                speed: Math.random() * 0.1 + 0.015,
                phase: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.02 + 0.008,
                hue: Math.random() > 0.75 ? 190 : 200,
            }));
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildStars();
        };

        // ── Shooting stars — noticeable but not a meteor shower ──────────────────
        // Roughly every 3–7s, with a small chance of a twin streak.
        const scheduleNextShootingStar = (initial = false) => {
            const delay = initial ? 1800 + Math.random() * 2500 : 3000 + Math.random() * 4000;
            nextShootingStarAt = performance.now() + delay;
        };

        const spawnShootingStar = () => {
            const angle = (Math.PI / 180) * (20 + Math.random() * 25);
            const speed = 9 + Math.random() * 6;
            shootingStars.push({
                x: width * 0.1 + Math.random() * width * 0.7,
                y: Math.random() * height * 0.35,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                len: 90 + Math.random() * 90,
                life: 0,
                maxLife: 45 + Math.random() * 25,
            });
        };

        const drawShootingStars = () => {
            shootingStars = shootingStars.filter(s => s.life < s.maxLife);
            for (const s of shootingStars) {
                s.life += 1;
                s.x += s.vx;
                s.y += s.vy;

                const progress = s.life / s.maxLife;
                const fade = progress < 0.15
                    ? progress / 0.15
                    : Math.max(0, 1 - Math.max(0, progress - 0.6) / 0.4);

                const norm = Math.hypot(s.vx, s.vy) || 1;
                const tailX = s.x - (s.vx / norm) * s.len;
                const tailY = s.y - (s.vy / norm) * s.len;

                const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
                grad.addColorStop(0, 'rgba(200, 230, 255, 0)');
                grad.addColorStop(1, `rgba(255, 255, 255, ${fade})`);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(s.x, s.y);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
                ctx.fill();
            }
        };

        const draw = (timestamp) => {
            ctx.clearRect(0, 0, width, height);
            for (const s of stars) {
                s.phase += s.twinkleSpeed;
                s.y += s.speed;
                if (s.y > height) { s.y = 0; s.x = Math.random() * width; }
                const twinkle = 0.4 + Math.sin(s.phase) * 0.35 + 0.35;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 100%, 80%, ${Math.max(0, Math.min(1, twinkle))})`;
                ctx.fill();
            }

            if (timestamp >= nextShootingStarAt) {
                spawnShootingStar();
                // Occasional twin — keeps it lively without feeling busy
                if (Math.random() < 0.22) spawnShootingStar();
                scheduleNextShootingStar();
            }
            drawShootingStars();

            raf = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize, { passive: true });
        scheduleNextShootingStar(true);
        raf = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-secondary pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
});

export default Starfield;
