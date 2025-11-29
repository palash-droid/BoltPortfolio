import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, Image } from 'lucide-react';
import { useState } from 'react';
import { certifications } from '../data/portfolio';
import ScrollDownIndicator from './ScrollDownIndicator';
import CertificationImageModal from './CertificationImageModal';
import AllCertificationsModal from './AllCertificationsModal';

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isAllCertificationsModalOpen, setIsAllCertificationsModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<{
    imageUrl: string;
    title: string;
    issuer: string;
  } | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return (
    <section id="certifications" className="relative min-h-screen flex flex-col justify-center py-20 bg-gray-50 dark:bg-dark-800 w-full max-w-full overflow-x-hidden">
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

        {/* Static Grid Container */}
        <div className="relative mb-16">
          <div className="flex justify-center gap-6 flex-wrap">
            {certifications.slice(0, 3).map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`w-full md:w-[350px] lg:w-[380px] bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 dark:border-dark-700 ${index > 0 ? 'hidden md:block' : 'block'
                  }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  {cert.image && (
                    <button
                      onClick={() => handleImageClick(cert)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-all duration-200"
                      title="View Certificate"
                    >
                      <Image className="h-4 w-4" />
                      <span>View Certificate</span>
                    </button>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                  {cert.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-1">
                  {cert.issuer}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-dark-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(cert.issueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </span>

                  {cert.verifyLink && (
                    <a
                      href={cert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                    >
                      Verify
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Certifications Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={() => setIsAllCertificationsModalOpen(true)}
            className="px-8 py-3 bg-white dark:bg-dark-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-dark-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Award className="h-5 w-5 text-accent-500" />
            View All Certifications
          </button>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center">
          <ScrollDownIndicator targetId="blogs" />
        </div>
      </div>

      {/* All Certifications Modal */}
      <AllCertificationsModal
        isOpen={isAllCertificationsModalOpen}
        onClose={() => setIsAllCertificationsModalOpen(false)}
      />

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
