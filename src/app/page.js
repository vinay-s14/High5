import PublicationsList from '../components/PublicationsList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <PublicationsList />
    </main>
  );
}

export const metadata = {
  title: 'Space Biology Publications',
  description: 'Browse space biology research publications',
};