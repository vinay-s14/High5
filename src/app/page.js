import FloatingChatbot from '../components/FloatingChatbot';
import PublicationsList from '../components/PublicationsList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <PublicationsList />
      <FloatingChatbot/>
    </main>
  );
}

export const metadata = {
  title: 'Space Biology Publications',
  description: 'Browse space biology research publications',
};