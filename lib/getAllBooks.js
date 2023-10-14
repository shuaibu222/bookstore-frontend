

export default async function getAllBooks() {
    const res = await fetch('http://localhost:9000/v1/api/public/books')
    return res.json()
}
