import KnowledgeGapFinder from '../components/KnowledgeGapFinder';
import PublicationsList from '../components/PublicationsList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <PublicationsList />
      <KnowledgeGapFinder/>
    </main>
  );
}

export const metadata = {
  title: 'Space Biology Publications',
  description: 'Browse space biology research publications',
};