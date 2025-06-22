import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from '@react-email/components';

export const WelcomeEmail = ({ name }: { name: string }) => (
  <Html>
    <Head />
    <Preview>Welcome to Vertix!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          Welcome to Vertix! We're excited to have you on board. You're now on the early access list, and we'll notify you as soon as we launch.
        </Text>
        <Button style={btn} href="https://x.com/vertix_market">
          Visit our social
        </Button>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btn = {
  backgroundColor: '#000',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}; 