import '../styles/index.css';

export const metadata = {
  title: 'Light House Logistics',
  description: 'Food ordering platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
