// VerificationCodeEmail.tsx

import React from 'react';
import { Html, Body, Container, Head, Heading, Text, Tailwind } from '@react-email/components';

interface VerificationCodeEmailProps {
  verificationCode: string;
  recipientName: string;
}

const VerificationCodeEmail: React.FC<VerificationCodeEmailProps> = ({ verificationCode, recipientName }) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Verification Code</Heading>
          <Text style={text}>Hello {recipientName},</Text>
          <Text style={text}>Your verification code is:</Text>
          <Text style={code}>{verificationCode}</Text>
          <Text style={text}>Please use this code to complete your registration.</Text>
          <Text style={text}>Thank you!</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationCodeEmail;

// Styles

const main: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Arial, sans-serif',
};

const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
};

const heading: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333333',
  marginBottom: '20px',
};

const text: React.CSSProperties = {
  fontSize: '16px',
  color: '#333333',
  marginBottom: '10px',
};

const code: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#1a73e8',
  margin: '20px 0',
};
