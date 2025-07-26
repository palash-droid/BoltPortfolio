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
    const carouselRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    // Double the skills array for seamless infinite scroll
    const duplicatedSkills = [...skills, ...skills];

    // Auto-scroll functionality
    useEffect(() => {
        const track = trackRef.current;
        if (!track || isPaused) return;

        const scrollSpeed = 1; // pixels per frame
        let animationId: number;

        const animate = () => {
            if (!isPaused && track) {
                const currentTransform = track.style.transform;
                const translateX = currentTransform.match(/translateX\(([^)]+)\)/);
                const currentX = translateX ? parseFloat(translateX[1]) : 0;

                // Reset position when halfway through
                const resetPoint = -((skills.length * 200) / 2); // Approximate width per skill item
                const newX = currentX <= resetPoint ? 0 : currentX - scrollSpeed;

                track.style.transform = `translateX(${newX}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused, skills.length]);

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
        if (!carouselRef.current) return;

        const scrollAmount = 200;
        const currentScroll = carouselRef.current.scrollLeft;
        const targetScroll = direction === 'left'
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount;

        carouselRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
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
                ref={carouselRef}
                className="skills-carousel relative overflow-hidden overflow-x-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div
                    ref={trackRef}
                    className="flex transition-none"
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
                                    className={`tooltip absolute -top-16 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg shadow-lg whitespace-nowrap ${isShowingTooltip ? 'opacity-100 visible translate-y-0' : ''
                                        }`}
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
                        className={`h-1 w-8 rounded-full transition-all duration-300 ${isPaused ? 'bg-primary-300' : 'bg-primary-500'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SkillsCarousel;