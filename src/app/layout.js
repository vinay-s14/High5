import './globals.css';
import FloatingChatbot from '../components/FloatingChatbot';

export const metadata = {
  title: {
    default: 'Space Biology Publications',
    template: '%s | Space Biology'
  },
  description: 'Browse space biology research publications',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}</body>
              <FloatingChatbot/>

    </html>
  );
}