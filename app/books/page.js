import getAllBooks from '@/lib/getAllBooks'


export default async function page() {
  const data = await getAllBooks()

  console.log(data);

  return (
    <main>
      {data.map((book) => {
        return <h1 key={book.ID}>{book.title}</h1>
      })}
    </main>
  )
}
