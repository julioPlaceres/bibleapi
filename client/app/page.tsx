import RootLayout from './layout'

export default function Home() {
  return (
    <RootLayout>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to the Bible API</h1>
        <p>Select a page to continue</p>
    </main>
    </RootLayout>
  )
}
