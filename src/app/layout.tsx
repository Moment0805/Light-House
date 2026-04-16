import '../styles/index.css';

export const metadata = {
  title: 'Bogaad',
  description: 'Food ordering platform',
  icons: {
    icon: '/bogaad.svg',
  },
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
