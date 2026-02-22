import React, { useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

export const ThemeSection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    // Play/pause handler
    const handlePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                // Play
                videoRef.current.play();
                setIsPlaying(true);
                // On first play, if the user explicitly clicked "assistir", unmute for them automatically
                if (isMuted) {
                    videoRef.current.muted = false;
                    setIsMuted(false);
                }
            } else {
                // Pause
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation(); // Avoid triggering play/pause
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <section id="tema-2026" className="py-24 bg-slate-900 border-b border-slate-800 relative overflow-hidden">
            {/* Background ambient lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-camp-primary rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-camp-secondary rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-camp-secondary uppercase font-black tracking-[0.2em] mb-4 text-sm md:text-base">Tema 2026</p>
                    <h2 className="text-5xl md:text-7xl font-display text-white mb-6 uppercase drop-shadow-lg">
                        Contracultura
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Uma chamada para viver além dos padrões. Você está pronto para ir contra o que o mundo dita?
                    </p>
                </div>

                {/* Video Player */}
                <div className="max-w-3xl mx-auto">
                    <div
                        className="group relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-800 cursor-pointer"
                        onClick={handlePlayPause}
                    >
                        {/* The Video */}
                        <video
                            ref={videoRef}
                            src="/gallery/Teaser.mp4"
                            className="w-full aspect-[4/5] sm:aspect-video object-cover transition-opacity duration-300"
                            playsInline
                            muted={true} // Must start muted
                            onEnded={handleVideoEnded}
                            poster="/gallery/1.jpeg" // Optional: using a fallback poster Image from gallery
                        />

                        {/* Default Overlay before play */}
                        <div
                            className={`absolute inset-0 bg-black/50 transition-all duration-300 flex flex-col items-center justify-center ${isPlaying ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'}`}
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-camp-primary/90 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:bg-camp-primary transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur-sm mb-4">
                                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-2 fill-white" />
                            </div>
                            <p className="text-white text-lg md:text-2xl font-bold tracking-wide drop-shadow-md text-center px-4">
                                Assista ao trailer do acampa
                            </p>
                        </div>

                        {/* Always available Mute button on hover (while playing) */}
                        <div className={`absolute bottom-4 right-4 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <button
                                onClick={toggleMute}
                                className="p-3 bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-md transition-all text-white border border-white/10"
                            >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
