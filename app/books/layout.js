

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function BookLayout({ children }) {
  return (
      <main className="grid max-w-5xl mx-auto my-0 min-h-screen">{children}</main>
  )
}
