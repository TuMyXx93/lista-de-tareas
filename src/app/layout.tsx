'use client';
import { AppShell, ColorSchemeScript, Group, MantineProvider, Switch, Button } from "@mantine/core";
import '@mantine/core/styles.css';
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider forceColorScheme={darkMode ? 'dark' : 'light'}>
          <AppShell
            header={{ height: 60 }}
            padding="md"
          >
            <AppShell.Header>
              <Group justify="space-between" p="md">
                <Group>
                  <Button onClick={() => router.push('/')} variant="subtle">Home</Button>
                  <Button onClick={() => router.push('/tasks')} variant="subtle">Tasks</Button>
                  <Button onClick={() => router.push('/products')} variant="subtle">Products</Button>
                </Group>
                <Switch
                  checked={darkMode}
                  onChange={(event) => setDarkMode(event.currentTarget.checked)}
                  label="Dark Mode"
                />
              </Group>
            </AppShell.Header>
            <AppShell.Main>
              {children}
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
