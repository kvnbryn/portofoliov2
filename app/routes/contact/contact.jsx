import { useForm, ValidationError } from '@formspree/react'
import { Form, useNavigation } from '@remix-run/react'
import { useRef } from 'react'
import { Button } from '~/components/button'
import { DecoderText } from '~/components/decoder-text'
import { Divider } from '~/components/divider'
import { Footer } from '~/components/footer'
import { Heading } from '~/components/heading'
import { Input } from '~/components/input'
import { Section } from '~/components/section'
import { Text } from '~/components/text'
import { tokens } from '~/components/theme-provider/theme'
import { Transition } from '~/components/transition'
import { useFormInput } from '~/hooks'
import { baseMeta } from '~/utils/meta'
import { cssProps, msToNum, numToMs } from '~/utils/style'
import styles from './contact.module.css'

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description: 'Send me a message if you’re interested in discussing a project or if you just want to say hi',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;

export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const { state } = useNavigation();
  const sending = state === 'submitting';
  
  // Menggunakan Formspree
  const [formState, handleSubmit] = useForm("xdkoepbp");

  // Log initial formState
  console.log("Initial formState:", formState);

  const handleSubmitWithLog = (e) => {
    console.log("Form submitted with:", email.value, message.value);
    handleSubmit(e);
  };

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!formState.succeeded} timeout={1600}>
        {({ status, nodeRef }) => (
          <Form
            onSubmit={handleSubmitWithLog}
            className={styles.form}
            method="POST"
            ref={nodeRef}
          >
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            {/* Hidden honeypot field to identify bots */}
            <Input
              className={styles.botkiller}
              label="Name"
              name="name"
              maxLength={MAX_EMAIL_LENGTH}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={formState.errors}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={formState.errors}
            />
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending || formState.submitting}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending || formState.submitting}
              loading={sending || formState.submitting}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send message
            </Button>
          </Form>
        )}
      </Transition>
      <Transition unmount in={formState.succeeded}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              I’ll get back to you within a couple days, sit tight
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
