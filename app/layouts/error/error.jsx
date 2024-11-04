import flatlineVideo from '~/assets/flatline.mp4'
import flatlinePoster from '~/assets/flatline.png'
import notFoundPoster from '~/assets/notfound.jpg'
import notFoundVideo from '~/assets/notfound.mp4'
import { Button } from '~/components/button'
import { DecoderText } from '~/components/decoder-text'
import { Heading } from '~/components/heading'
import { Image } from '~/components/image'
import { Text } from '~/components/text'
import { Transition } from '~/components/transition'
import flatlineSkull from './error-flatline.svg'
import styles from './error.module.css'

export function Error({ error }) {
  const flatlined = !error.status;

  const getMessage = () => {
    switch (error.status) {
      case 404:
        return {
          summary: 'Error: redacted',
          message:
            'This page could not be found. It either doesn’t exist or was deleted. Or perhaps you don’t exist and this webpage couldn’t find you.',
        };
      case 405:
        return {
          summary: 'Error: method denied',
          message: error.data,
        };
      default:
        return {
          summary: 'Error: anomaly',
          message: error.statusText || error.data || error.toString(),
        };
    }
  };

  const { summary, message } = getMessage();

  return (
    <section className={styles.page}>
      {flatlined && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              [data-theme='dark'] {
                --primary: oklch(69.27% 0.242 25.41);
                --accent: oklch(69.27% 0.242 25.41);
              }
              [data-theme='light'] {
                --primary: oklch(56.29% 0.182 26.5);
                --accent: oklch(56.29% 0.182 26.5);
              }
            `,
          }}
        />
      )}
      <Transition in>
        {({ visible }) => (
          <>
            <div className={styles.details}>
              <div className={styles.text}>
                {!flatlined && (
                  <Heading
                    className={styles.title}
                    data-visible={visible}
                    level={0}
                    weight="bold"
                  >
                    {error.status}
                  </Heading>
                )}
                {flatlined && (
                  <Heading
                    className={styles.titleFlatline}
                    data-visible={visible}
                    level={2}
                    as="h1"
                  >
                    <svg width="60" height="80" viewBox="0 0 60 80">
                      <use href={`${flatlineSkull}#skull`} />
                    </svg>
                    <DecoderText text="Flatlined" start={visible} delay={300} />
                  </Heading>
                )}
                {!flatlined && (
                  <Heading
                    aria-hidden
                    className={styles.subheading}
                    data-visible={visible}
                    as="h2"
                    level={4}
                  >
                    <DecoderText text={summary} start={visible} delay={300} />
                  </Heading>
                )}
                {flatlined ? (
                  <Text className={styles.description} data-visible={visible} as="p">
                    {/* Pesan custom Anda di sini */}
                    Maaf, WebGL tidak tersedia di browser Anda. 
                    Untuk Chrome, silahkan masuk ke Setting,
                    Pada bagian System, Aktifkan "Use graphics acceleration when available"
                  </Text> 
                ) : (
                  <Text className={styles.description} data-visible={visible} as="p">
                    {message}
                  </Text>
                )}
                {flatlined ? (
                  <Button
                    secondary
                    iconHoverShift
                    className={styles.button}
                    data-visible={visible}
                    href="https://www.tiktok.com/@christyjkt48/video/7429995741780954374?q=christy&t=1730714580171"
                    icon="chevron-right"
                  >
                    Emotional support
                  </Button>
                ) : (
                  <Button
                    secondary
                    iconHoverShift
                    className={styles.button}
                    data-visible={visible}
                    href="/"
                    icon="chevron-right"
                  >
                    Back to homepage
                  </Button>
                )}
              </div>
            </div>

            <div className={styles.videoContainer} data-visible={visible}>
              <Image
                reveal
                cover
                noPauseButton
                delay={600}
                className={styles.video}
                src={flatlined ? flatlineVideo : notFoundVideo}
                placeholder={flatlined ? flatlinePoster : notFoundPoster}
              />
              {flatlined ? (
                <a
                  className={styles.credit}
                  data-visible={visible}
                  href="https://www.imdb.com/title/tt0318871/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Animation from Berserk (1997)
                </a>
              ) : (
                <a
                  className={styles.credit}
                  data-visible={visible}
                  href="https://www.imdb.com/title/tt0113568/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Animation from Ghost in the Shell (1995)
                </a>
              )}
            </div>
          </>
        )}
      </Transition>
    </section>
  );
}