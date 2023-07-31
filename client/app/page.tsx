import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24 bg-cover bg-center" style={{backgroundImage: 'url(/cross.jpg)' }}>
      <h1 className='text-4xl text-yellow-500 mb-6'>Welcome to the Bible API</h1>
        <p className='text-2xl text-red-600 mb-12'>Select a page to continue</p>
        <div className="flex">
          <Link href="/form" className="inline-block py-3 px-6 bg-yellow-500 hover:bg-red-500 text-white rounded mr-4 transition-colors">
            Form View
          </Link>
          <Link href="/view-data" className="inline-block py-3 px-6 bg-yellow-500 hover:bg-red-500 text-white rounded transition-colors">
            Data View
          </Link>
        </div>
    </main>
  )
}
