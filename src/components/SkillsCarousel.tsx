import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Database,
    BarChart3,
    Brain,
    Calculator,
    TrendingUp,
    PieChart,
    Bot,
    Zap,
    Activity,
    FileSpreadsheet,
    Code,
    Terminal,
    Target,
    Cloud,
    Box
} from 'lucide-react';
import { Skill } from '../types';

// Icon mapping for skills
const iconMap = {
    Database,
    BarChart3,
    Brain,
    Calculator,
    TrendingUp,
    PieChart,
    Bot,
    Zap,
    Activity,
    FileSpreadsheet,
    Code,
    Terminal,
    Target,
    Cloud,
    Box,
} as const;

interface SkillsCarouselProps {
    skills: Skill[];
    className?: string;
}

const SkillsCarousel: React.FC<SkillsCarouselProps> = ({ skills, className = '' }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [showTooltip, setShowTooltip] = useState<string | null>(null);
    const [isManualScrolling, setIsManualScrolling] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();
    const positionRef = useRef(0);

    // Create multiple copies for seamless infinite scroll
    const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

    // Auto-scroll functionality with proper infinite scroll
    useEffect(() => {
        const track = trackRef.current;
        if (!track || isPaused || isManualScrolling) return;

        const speed = 0.5; // pixels per frame
        const skillWidth = 200; // approximate width of each skill item
        const totalWidth = skills.length * skillWidth;

        const animate = () => {
            if (!isPaused && !isManualScrolling && track) {
                positionRef.current -= speed;

                // Reset position when we've scrolled through one complete set
                if (positionRef.current <= -totalWidth) {
                    positionRef.current = 0;
                }

                track.style.transform = `translateX(${positionRef.current}px)`;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPaused, isManualScrolling, skills.length]);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        setShowTooltip(null);
    };

    const handleSkillHover = (skillName: string) => {
        setShowTooltip(skillName);
    };

    const handleSkillLeave = () => {
        setShowTooltip(null);
    };

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (!trackRef.current) return;

        // Pause auto-scroll during manual scrolling
        setIsManualScrolling(true);

        const scrollAmount = 200;
        const skillWidth = 200; // approximate width of each skill item
        const totalWidth = skills.length * skillWidth;

        // Update the position reference
        if (direction === 'left') {
            positionRef.current += scrollAmount;
        } else {
            positionRef.current -= scrollAmount;
        }

        // Handle wrapping for infinite scroll
        if (positionRef.current > 0) {
            positionRef.current = -totalWidth + (positionRef.current % totalWidth);
        } else if (positionRef.current <= -totalWidth) {
            positionRef.current = positionRef.current % totalWidth;
        }

        // Apply the new position with smooth transition
        trackRef.current.style.transition = 'transform 0.5s ease-in-out';
        trackRef.current.style.transform = `translateX(${positionRef.current}px)`;

        // Resume auto-scroll after transition completes
        setTimeout(() => {
            setIsManualScrolling(false);
            if (trackRef.current) {
                trackRef.current.style.transition = 'none';
            }
        }, 500);
    };

    const getIconComponent = (iconName: string) => {
        return iconMap[iconName as keyof typeof iconMap] || Code;
    };

    return (
        <div className={`skills-carousel-container relative ${className}`}>
            {/* Navigation Arrows */}
            <button
                onClick={() => scrollCarousel('left')}
                className="carousel-nav absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-dark-700 transition-all duration-200"
                aria-label="Scroll skills left"
            >
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>

            <button
                onClick={() => scrollCarousel('right')}
                className="carousel-nav absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-dark-700 transition-all duration-200"
                aria-label="Scroll skills right"
            >
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Carousel Container */}
            <div
                ref={containerRef}
                className="skills-carousel relative overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    ref={trackRef}
                    className="flex"
                    style={{ width: 'fit-content' }}
                >
                    {duplicatedSkills.map((skill, index) => {
                        const IconComponent = getIconComponent(skill.icon);
                        const isShowingTooltip = showTooltip === `${skill.name}-${index}`;

                        return (
                            <div
                                key={`${skill.name}-${index}`}
                                className="skill-item relative flex-shrink-0 mx-3 group"
                                onMouseEnter={() => handleSkillHover(`${skill.name}-${index}`)}
                                onMouseLeave={handleSkillLeave}
                            >
                                {/* Skill Icon and Name */}
                                <div className="flex items-center space-x-3 bg-white/70 dark:bg-dark-800/70 backdrop-blur-sm rounded-full px-4 py-3 border border-gray-200/50 dark:border-dark-600/50 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div
                                        className={`skill-icon p-2 rounded-full`}
                                        data-color={skill.color}
                                    >
                                        <IconComponent className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                            {skill.name}
                                        </span>
                                        <span className="skill-category text-gray-500 dark:text-gray-400">
                                            {skill.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Tooltip */}
                                <div
                                    className={`tooltip absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg shadow-lg whitespace-nowrap ${isShowingTooltip ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                                >
                                    <div className="font-medium">{skill.name}</div>
                                    <div className="text-gray-300 dark:text-gray-600 text-xs">{skill.category}</div>
                                    {/* Tooltip arrow */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center mt-4 space-x-1">
                {skills.slice(0, 5).map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-8 rounded-full transition-all duration-300 ${isPaused || isManualScrolling ? 'bg-primary-300' : 'bg-primary-500'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SkillsCarousel;