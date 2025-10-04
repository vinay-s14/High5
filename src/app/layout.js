import './globals.css';

export const metadata = {
  title: {
    default: 'Space Biology Publications',
    template: '%s | Space Biology'
  },
  description: 'Browse NASA space biology research publications',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">Space Biology Dashboard</h1>
        </header>
        <main className="py-6">{children}</main>
      </body>
    </html>
  );
}
