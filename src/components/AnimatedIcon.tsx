import { Link } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const ParticleContainer = styled.div`
  position: relative;
  display: inline-block;
  color: inherit;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 3px;
  height: 8px;
  background: currentColor;
  border-radius: 40% 40% 50% 50%;
  transform-origin: center bottom;
  margin-left: -1.5px; /* Half of width */
  margin-top: -4px; /* Half of height */
`;

interface AnimatedIconProps {
  link: string;
  children: React.ReactNode;
}

export default function AnimatedIcon({ link, children }: AnimatedIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(12);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const baseRadius = Math.min(width, height) * 0.5;
      setRadius(baseRadius);
    }
  }, []);

  const particles = Array.from({ length: 8 }).map((_, index) => {
    const angle = (index * Math.PI * 2) / 8;
    const x = Math.cos(angle) * radius;
    // Offset y position upward by 3px
    const y = Math.sin(angle) * radius - 3;
    const rotation = (angle * 180) / Math.PI + 90;

    return {
      id: index,
      x,
      y,
      rotation,
    };
  });

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ color: 'inherit' }}
    >
      <ParticleContainer ref={containerRef}>
        {children}
        <AnimatePresence>
          {isHovered &&
            particles.map(particle => (
              <Particle
                key={particle.id}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                  rotate: particle.rotation,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  x: [0, particle.x * 1.2, particle.x * 1.5],
                  y: [0, particle.y * 1.2, particle.y * 1.5],
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  x: particle.x * 1.5,
                  y: particle.y * 1.5,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
        </AnimatePresence>
      </ParticleContainer>
    </Link>
  );
}
