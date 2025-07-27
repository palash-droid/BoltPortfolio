import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Image, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { certifications } from '../data/portfolio';
import ScrollDownIndicator from './ScrollDownIndicator';
import CertificationImageModal from './CertificationImageModal';

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCert, setSelectedCert] = useState<{
    imageUrl: string;
    title: string;
    issuer: string;
  } | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (cert: any) => {
    if (cert.image) {
      setSelectedCert({
        imageUrl: cert.image,
        title: cert.title,
        issuer: cert.issuer
      });
    }
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const isSmallMobile = window.innerWidth < 480;
      const isMobile = window.innerWidth < 768;

      let cardWidth, gap;
      if (isSmallMobile) {
        cardWidth = 256; // w-64
        gap = 16;
      } else if (isMobile) {
        cardWidth = 256; // w-64 on mobile
        gap = 16;
      } else {
        cardWidth = 320; // w-80 on desktop
        gap = 24;
      }

      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const isSmallMobile = window.innerWidth < 480;
      const isMobile = window.innerWidth < 768;

      let cardWidth, gap;
      if (isSmallMobile) {
        cardWidth = 256; // w-64
        gap = 16;
      } else if (isMobile) {
        cardWidth = 256; // w-64 on mobile
        gap = 16;
      } else {
        cardWidth = 320; // w-80 on desktop
        gap = 24;
      }

      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="certifications" className="relative py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications & Achievements
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise in data science and technology
          </p>
        </motion.div>

        {/* Scrollable Container with Navigation */}
        <div className="relative mb-16">
          {/* Container with padding for navigation buttons */}
          <div className="flex items-center">
            {/* Left Navigation Button */}
            <button
              onClick={scrollLeft}
              className="flex-shrink-0 mr-4 bg-white dark:bg-dark-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Cards Container - Fixed width to show exactly 3 cards */}
            <div className="flex-1 overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide certification-container"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="flex-shrink-0 w-64 sm:w-70 md:w-80 bg-white dark:bg-dark-900 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>

                    <h3 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {cert.title}
                    </h3>

                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {cert.issuer}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                      Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </p>

                    <div className="flex items-center gap-3">
                      {cert.verifyLink && (
                        <a
                          href={cert.verifyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 text-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Verify
                        </a>
                      )}

                      {cert.image && (
                        <button
                          onClick={() => handleImageClick(cert)}
                          className="inline-flex items-center gap-2 text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors duration-200 text-sm"
                          aria-label={`View ${cert.title} certification image`}
                        >
                          <Image className="h-4 w-4" />
                          View
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={scrollRight}
              className="flex-shrink-0 ml-4 bg-white dark:bg-dark-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 dark:border-gray-700 hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center">
          <ScrollDownIndicator targetId="blogs" />
        </div>
      </div>

      {/* Certification Image Modal */}
      {selectedCert && (
        <CertificationImageModal
          isOpen={!!selectedCert}
          onClose={closeModal}
          imageUrl={selectedCert.imageUrl}
          title={selectedCert.title}
          issuer={selectedCert.issuer}
        />
      )}
    </section>
  );
};

export default Certifications;