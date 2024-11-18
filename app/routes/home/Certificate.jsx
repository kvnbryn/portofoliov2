import { useEffect, useState } from "react"
import { BsLink45Deg, BsSearch } from "react-icons/bs"
import { Divider } from "~/components/divider"
import { Heading } from "~/components/heading"
import { Section } from "~/components/section"
import { Transition } from "~/components/transition"
import styles from "./Certificate.module.css"

export const Certificates = () => {
  const certificates = [
    {
      title: "Google Play Store Listing Certificate",
      image: "/app/assets/aa.jpg",
      link: "https://www.credential.net/6f4c7e6e-a9e8-4753-8bbf-1a035dc09035",
      legalitas: "Google Play Store Listing Certificate",
      description: "Certification for optimizing listings in Google Play Store.",
    },
    {
      title: "Dasar Visualisasi Data",
      image: "/app/assets/a.jpg",
      link: "https://www.dicoding.com/certificates/0LZ04NNJ3P65",
      legalitas: "Dasar Visualisasi Data",
      description: "Recognized for outstanding performance in the program.",
    },
  ];

  const [isHovered, setIsHovered] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(`.${styles.certificates}`);
      if (section && section.getBoundingClientRect().top < window.innerHeight) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section className={styles.certificates} as="section">
      <div className={styles.content}>
        <Transition in={isVisible} timeout={300}>
          {({ visible }) => (
            <Heading
              className={styles.mainHeading}
              level={3}
              data-visible={visible}
            >
              <div className={styles.tag} data-visible={visible} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={300} // Delay sync with Certificates text
                />
                <div className={styles.tagText} data-visible={visible}>
                  Certificates
                </div>
              </div>
            </Heading>
          )}
        </Transition>

        <Transition in={isVisible} timeout={300}>
          {({ visible }) => (
            <div className={styles.certificatesGrid} data-visible={visible}>
              {certificates.map((certificate, index) => (
                <div
                  key={index}
                  className={styles.certificateBox}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  data-visible={visible}
                >
                  <div className={styles.certificateContent}>
                    <img
                      className={styles.certificateImage}
                      src={certificate.image}
                      alt={certificate.title || "Certificate"}
                    />
                    <div className={styles.previewContent}>
                      <h4 className={styles.previewTitle}>
                        {certificate.title}
                      </h4>
                      <p className={styles.previewDescription}>
                        {certificate.description}
                      </p>
                    </div>
                    <div
                      className={`${styles.overlay} ${
                        isHovered === index ? styles.show : ""
                      }`}
                    >
                      <div className={styles.iconContainer}>
                        <a
                          href={certificate.image}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BsSearch className={styles.icon} />
                        </a>
                        <a
                          href={certificate.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BsLink45Deg className={styles.icon} />
                        </a>
                      </div>
                      <p className={styles.legalitas}>
                        {certificate.legalitas}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Transition>
      </div>
    </Section>
  );
};
