// app/routes/experiences_._index/route.jsx

import { useState, useEffect } from 'react';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Link as RouterLink } from '@remix-run/react';
import { baseMeta } from '~/utils/meta';
import { formatDate } from '~/utils/date';
import { cssProps } from '~/utils/style';
import { experiencesData } from './experiences.data';
import styles from './experiences.module.css';

function ExperiencePost({ title, description, image, slug, date, index }) {
  const [dateTime, setDateTime] = useState(null);
  useEffect(() => { setDateTime(formatDate(date)); }, [date, dateTime]);
  return (
    <article className={styles.post} style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}>
      <RouterLink to={`/experiences/${slug}`} className={styles.postLink}>
        <div className={styles.postImage}>
          <Image src={image} placeholder={image} alt={title} role="presentation" />
        </div>
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            {dateTime}
          </div>
          <Heading as="h2" level={4}>{title}</Heading>
          <Text size="s" as="p">{description}</Text>
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">See Details</Button>
          </div>
        </div>
      </RouterLink>
    </article>
  );
}

const Experiences = () => {
  return (
    <article className={styles.experiences}>
      <Section className={styles.content}>
        <header className={styles.header}>
          <Heading className={styles.heading} level={5} as="h1"><DecoderText text="My Experiences" /></Heading>
        </header>
        <div className={styles.list}>
          {experiencesData.map((post, index) => (
            <ExperiencePost key={index} index={index} {...post} />
          ))}
        </div>
      </Section>
      <Footer />
    </article>
  );
};
export const meta = () => {
  return baseMeta({ title: 'Experiences', description: 'A collection of my projects, bug findings, and other experiences.' });
};
export default Experiences;