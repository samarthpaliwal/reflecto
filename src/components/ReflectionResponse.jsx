export default function ReflectionResponse({ reflection }) {
  if (!reflection) return null
  return (
    <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">Reflecto asks:</h2>
      <p className="whitespace-pre-wrap text-gray-700">{reflection}</p>
    </div>
  )
}
