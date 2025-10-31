// portofoliov2-main/app/routes/certificates/route.jsx

import { useState, useEffect } from 'react';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Link } from '~/components/link';
import { baseMeta } from '~/utils/meta';
import { formatDate } from '~/utils/date';
import { cssProps } from '~/utils/style';
import { certificatesData } from './certificates.data';
import styles from './certificates.module.css';

// << 1. Komponen Post disederhanakan untuk satu layout konsisten
function CertificatePost({
  title,
  description,
  image,
  link,
  date,
  index,
}) {
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    setDateTime(formatDate(date));
  }, [date, dateTime]);

  return (
    <article
      className={styles.post}
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      <Link
        href={link}
        target="_blank"
        className={styles.postLink}
      >
        {/* << 2. Container untuk gambar lanskap */}
        <div className={styles.postImage}>
          <Image
            src={image}
            placeholder={image}
            alt={title}
            role="presentation"
          />
        </div>
        {/* << 3. Detail teks di samping gambar */}
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            {dateTime}
          </div>
          <Heading as="h2" level={4}>
            {title}
          </Heading>
          <Text size="s" as="p">
            {description}
          </Text>
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">
              Verify Certificate
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
}

const Certificates = () => {
  return (
    <article className={styles.certificates}>
      <Section className={styles.content}>
        <header className={styles.header}>
          <Heading className={styles.heading} level={5} as="h1">
            <DecoderText text="My Certificates" />
          </Heading>
        </header>
        {/* << 4. Langsung render semua sertifikat dalam satu daftar */}
        <div className={styles.list}>
          {certificatesData.map((post, index) => (
            <CertificatePost key={index} index={index} {...post} />
          ))}
        </div>
      </Section>
      <Footer />
    </article>
  );
};

export const meta = () => {
  return baseMeta({
    title: 'Certificates',
    description: 'A collection of my professional certificates and achievements.',
  });
};

export default Certificates;