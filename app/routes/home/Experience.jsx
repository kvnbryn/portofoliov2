import { useEffect, useState } from "react"
import { BsLink45Deg, BsSearch } from "react-icons/bs"
import { Divider } from "~/components/divider"
import { Heading } from "~/components/heading"
import { Section } from "~/components/section"
import { Transition } from "~/components/transition"
import styles from "./Experience.module.css"

export const Experience = () => {
  const certificates = [
    {
      title: "first bug",
      image: "https://raw.githubusercontent.com/kvnbryn/assetsPortfolio/refs/heads/main/exp/1.jpeg",
      link: "https://app.kajabi.com/certificates/ec1b5c30",
      legalitas: "Sqli time-based error kemdikbud subdomain",
      description: "Certification for optimizing listings in Google Play Store.",
    }
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
                  collapseDelay={300}
                />
                <div className={styles.tagText} data-visible={visible}>
                  Experience
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
