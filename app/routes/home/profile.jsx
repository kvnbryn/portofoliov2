import { Fragment, useState } from 'react'
import { Button } from '~/components/button'
import { Divider } from '~/components/divider'
import { Heading } from '~/components/heading'
import { Section } from '~/components/section'
import { Text } from '~/components/text'
import { Transition } from '~/components/transition'
import katakana from './katakana.svg'
import styles from './profile.module.css'
import { Link } from '~/components/link';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
    <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
  Hello, I’m Kevin — a cybersecurity enthusiast based in Manado, Indonesia. I’m actively sharpening my skills through self-learning, exploring real-world vulnerabilities, and participating in CTF (Capture The Flag) challenges. I’m also proficient in Python and enjoy digging into low-level systems.
</Text>
<Text className={styles.description} data-visible={visible} size="l" as="p">
  You can find some of my hands-on exercises and labs on{' '}
  <Link href="https://tryhackme.com/p/kvnbryank" target="_blank" rel="noopener noreferrer">TryHackMe</Link>.
</Text>
<Text className={styles.description} data-visible={visible} size="l" as="p">
  I'm always eager to learn and contribute to the cybersecurity community. If you share the same passion or would like to explore a project together, feel free to reach out.
</Text>

  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
                <svg className={styles.svg} data-visible={visible} viewBox="0 0 136 766">
                  <use href={`${katakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
        )}
      </Transition>
    </Section>
  );
};
