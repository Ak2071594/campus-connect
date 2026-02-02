import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/types';

interface EventCarouselProps {
  events: Event[];
}

export function EventCarousel({ events }: EventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % events.length;
      }
      return prev === 0 ? events.length - 1 : prev - 1;
    });
  };

  const currentEvent = events[currentIndex];

  return (
    <div className="relative w-full h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentEvent.banner})` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Club Badge */}
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={currentEvent.clubLogo}
                  alt={currentEvent.clubName}
                  className="w-8 h-8 rounded-full border-2 border-primary-foreground/50"
                />
                <span className="text-primary-foreground/90 text-sm font-medium">
                  {currentEvent.clubName}
                </span>
              </div>

              {/* Event Title */}
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4 max-w-2xl">
                {currentEvent.title}
              </h2>

              {/* Event Details */}
              <div className="flex flex-wrap gap-4 text-primary-foreground/90 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(currentEvent.date).toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short', 
                    day: 'numeric' 
                  })} at {currentEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{currentEvent.venue}</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button variant="accent" size="lg" className="mt-6">
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => navigate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-primary-foreground'
                : 'bg-primary-foreground/50 hover:bg-primary-foreground/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
