import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoCVModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const VideoCVModal = ({ isOpen, onClose }: VideoCVModalProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showOverlay, setShowOverlay] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const dragRef = useRef<{ rect: DOMRect | null; isActive: boolean }>({ rect: null, isActive: false });

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setIsPlaying(false);
            setProgress(0);
            setDuration(0);
            setShowOverlay(true);
            setIsHovering(false);
            setIsDragging(false);
            dragRef.current = { rect: null, isActive: false };

            // Reset video if it exists
            if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.pause();
            }
        }
    }, [isOpen]);

    const togglePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const handleReplay = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setIsPlaying(true);
        }
    }, []);

    const handleVideoEnded = useCallback(() => {
        setIsPlaying(false);
        setProgress(100);
    }, []);

    const handleVideoPlay = useCallback(() => {
        setIsPlaying(true);
        setShowOverlay(false);
    }, []);

    const handleVideoPause = useCallback(() => {
        setIsPlaying(false);
        setShowOverlay(true);
    }, []);

    const handleVideoMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleVideoMouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    const handleTimeUpdate = useCallback(() => {
        // Only update progress from video if not dragging
        if (videoRef.current && !isDragging) {
            const currentTime = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            if (duration > 0) {
                setProgress((currentTime / duration) * 100);
            }
        }
    }, [isDragging]);

    const handleLoadedMetadata = useCallback(() => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    }, []);

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    const updateVideoProgress = useCallback((percentage: number) => {
        if (videoRef.current && duration > 0) {
            const newTime = (percentage / 100) * duration;
            // Update progress immediately for responsive UI
            setProgress(percentage);
            // Set video time with a small delay to ensure smooth seeking
            requestAnimationFrame(() => {
                if (videoRef.current) {
                    videoRef.current.currentTime = newTime;
                }
            });
        }
    }, [duration]);

    const handleProgressBarClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        // Only handle click if it's not part of a drag operation
        if (event.detail === 1 && !dragRef.current.isActive) {
            const progressBar = event.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
            updateVideoProgress(percentage);
        }
    }, [updateVideoProgress]);

    const handleProgressBarMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
        dragRef.current.isActive = true;

        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        dragRef.current.rect = rect;

        const handleMouseMove = (e: MouseEvent) => {
            if (videoRef.current && duration > 0 && dragRef.current.rect) {
                const clickX = e.clientX - dragRef.current.rect.left;
                const percentage = Math.max(0, Math.min(100, (clickX / dragRef.current.rect.width) * 100));
                // Update progress immediately for smooth dragging
                setProgress(percentage);
                // Update video time with throttling for better performance
                if (videoRef.current) {
                    const newTime = (percentage / 100) * duration;
                    videoRef.current.currentTime = newTime;
                }
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            dragRef.current.isActive = false;
            dragRef.current.rect = null;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        // Set initial position on mouse down immediately
        const clickX = event.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
        setProgress(percentage);
        if (videoRef.current && duration > 0) {
            const newTime = (percentage / 100) * duration;
            videoRef.current.currentTime = newTime;
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [updateVideoProgress, duration]);

    // Touch event handlers for mobile
    const handleProgressBarTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
        dragRef.current.isActive = true;

        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        dragRef.current.rect = rect;

        const handleTouchMove = (e: TouchEvent) => {
            if (videoRef.current && duration > 0 && dragRef.current.rect && e.touches[0]) {
                const touch = e.touches[0];
                const clickX = touch.clientX - dragRef.current.rect.left;
                const percentage = Math.max(0, Math.min(100, (clickX / dragRef.current.rect.width) * 100));
                // Update progress immediately for smooth dragging
                setProgress(percentage);
                // Update video time with throttling for better performance
                if (videoRef.current) {
                    const newTime = (percentage / 100) * duration;
                    videoRef.current.currentTime = newTime;
                }
            }
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
            dragRef.current.isActive = false;
            dragRef.current.rect = null;
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        // Set initial position on touch start immediately
        if (event.touches[0]) {
            const touch = event.touches[0];
            const clickX = touch.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
            setProgress(percentage);
            if (videoRef.current && duration > 0) {
                const newTime = (percentage / 100) * duration;
                videoRef.current.currentTime = newTime;
            }
        }

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, [updateVideoProgress, duration]);

    // Memoized values for better performance
    const showPlayOverlay = useMemo(() => {
        // On mobile, don't show overlay when playing (no hover support)
        const isMobile = 'ontouchstart' in window;
        if (isMobile && isPlaying) {
            return false;
        }
        return showOverlay || (isPlaying && isHovering);
    }, [showOverlay, isPlaying, isHovering]);

    const showReplayOverlay = useMemo(() => {
        return progress >= 100;
    }, [progress]);

    const footerText = useMemo(() => {
        if (progress >= 100) {
            return 'Video completed. Click replay to watch again.';
        }
        return isPlaying ? 'Click pause button to pause the video' : 'Click the play button to start the video';
    }, [progress, isPlaying]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-75"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full mx-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Video CV
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                                aria-label="Close modal"
                            >
                                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Video Container */}
                        <div className="p-6">
                            <div
                                className="relative bg-black rounded-lg overflow-hidden"
                                onMouseEnter={handleVideoMouseEnter}
                                onMouseLeave={handleVideoMouseLeave}
                            >
                                <video
                                    ref={videoRef}
                                    className="w-full h-auto max-h-[70vh]"
                                    onEnded={handleVideoEnded}
                                    onPlay={handleVideoPlay}
                                    onPause={handleVideoPause}
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadedMetadata}
                                >
                                    <source src="/video-cv.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Play/Pause Overlay Button - Show when not playing OR when hovering while playing */}
                                <AnimatePresence>
                                    {showPlayOverlay && (
                                        <motion.button
                                            onClick={togglePlayPause}
                                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-200 group"
                                            aria-label={isPlaying ? 'Pause video' : 'Play video'}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform duration-200">
                                                {isPlaying ? (
                                                    <Pause className="h-8 w-8 text-gray-900" />
                                                ) : (
                                                    <Play className="h-8 w-8 text-gray-900 ml-1" />
                                                )}
                                            </div>
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                {/* Replay Button - Only show when video ends */}
                                <AnimatePresence>
                                    {showReplayOverlay && (
                                        <motion.button
                                            onClick={handleReplay}
                                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-200 group"
                                            aria-label="Replay video"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform duration-200">
                                                <RotateCcw className="h-8 w-8 text-gray-900" />
                                            </div>
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                {/* Progress Bar */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <div
                                                className="w-full bg-gray-600 rounded-full h-2 cursor-pointer relative group"
                                                onClick={handleProgressBarClick}
                                                onMouseDown={handleProgressBarMouseDown}
                                                onTouchStart={handleProgressBarTouchStart}
                                            >
                                                <div
                                                    className="bg-primary-500 h-2 rounded-full transition-all duration-200"
                                                    style={{ width: `${progress}%` }}
                                                />
                                                {/* Progress indicator dot */}
                                                <div
                                                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg border border-gray-300 transition-all duration-200"
                                                    style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                                                />
                                                {/* Progress bar hover indicator */}
                                                <div className="absolute inset-0 bg-transparent group-hover:bg-white group-hover:bg-opacity-20 rounded-full transition-all duration-200" />
                                            </div>
                                        </div>
                                        <div className="text-white text-sm font-medium">
                                            {videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00'} / {formatTime(duration)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {footerText}
                            </p>
                            <div className="flex gap-2">
                                {showReplayOverlay ? (
                                    <button
                                        onClick={handleReplay}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                        Replay
                                    </button>
                                ) : (
                                    <button
                                        onClick={togglePlayPause}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
                                    >
                                        {isPlaying ? (
                                            <>
                                                <Pause className="h-4 w-4" />
                                                Pause
                                            </>
                                        ) : (
                                            <>
                                                <Play className="h-4 w-4" />
                                                Play
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoCVModal; 