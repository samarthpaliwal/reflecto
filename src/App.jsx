export default function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('reflecto_entries')
    return saved ? JSON.parse(saved) : []
  })

  const [reflection, setReflection] = useState('')
  const [loading, setLoading] = useState(false)

  const addEntry = async (text) => {
    const updated = [text, ...entries]
    setEntries(updated)
    localStorage.setItem('reflecto_entries', JSON.stringify(updated))
    setLoading(true)
    const response = await getReflection(text)
    setReflection(response)
    setLoading(false)
  }

return (
  <div className="min-h-screen p-8 bg-gray-100">
    <h1 className="text-2xl font-bold mb-4">Reflecto</h1>

    {/* ✅ Tailwind test */}
    <div className="p-6 bg-green-100 text-green-900 rounded-lg mt-4">
      ✅ Tailwind is working!
    </div>

    {/* Rest of your app... */}
    <JournalEditor onSubmit={addEntry} />
    {loading ? <p>Thinking...</p> : <ReflectionResponse reflection={reflection} />}
    <EntryList entries={entries} />
  </div>
)

}


