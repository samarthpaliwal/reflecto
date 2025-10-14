export default function JournalEditor({ onSubmit }) {
  const [entry, setEntry] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (entry.trim()) {
      onSubmit(entry)
      setEntry('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write what's on your mind..."
        className="w-full h-32 p-4 text-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="submit"
        className="mt-3 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Reflect on this entry
      </button>
    </form>
  )
}
