export default function EntryList({ entries }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Journal</h2>
      {entries.length === 0 ? (
        <p className="text-gray-500">No entries yet. Start reflecting!</p>
      ) : (
        <ul className="space-y-2 list-disc pl-6">
          {entries.map((entry, idx) => (
            <li key={idx} className="text-gray-700 text-sm">
              {entry}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
