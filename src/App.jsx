import { useState } from 'react'

const CORRECT_PASSWORD = 'instacontent2024'

const INCIDENT_TYPES = [
  'De-escalation',
  'VIP Protection',
  'Crowd Management',
  'Emergency Response'
]

const VENUE_TYPES = [
  'Nightclub',
  'Restaurant',
  'Hotel',
  'Event',
  'Beach Club'
]

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [incidentType, setIncidentType] = useState('')
  const [venueType, setVenueType] = useState('')
  const [story, setStory] = useState('')
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === CORRECT_PASSWORD) {
      setAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  const generateSlides = async () => {
    if (!incidentType || !venueType || !story) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')
    setSlides([])

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

      if (!apiKey) {
        throw new Error('API key not configured')
      }

      const prompt = `You are an Instagram content expert for security companies. Generate exactly 5 carousel slides for an Instagram post about this security incident:

Incident Type: ${incidentType}
Venue: ${venueType}
Story: ${story}

Create 5 slides following this structure:
- Slide 1: Hook/Problem (grab attention with the challenge)
- Slide 2: Story/Action Part 1 (what happened)
- Slide 3: Story/Action Part 2 (what security did)
- Slide 4: Result/Lesson (the outcome and takeaway)
- Slide 5: Call-to-action (book Miami Protector security services)

For EACH slide, provide:
- Title: Exactly 5-8 words, attention-grabbing
- Body: Exactly 15-25 words, engaging and professional

Format your response as JSON array with this exact structure:
[
  {
    "title": "Title here",
    "body": "Body text here"
  }
]

Make it compelling, professional, and focused on showcasing security expertise.`

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      const content = data.content[0].text

      // Extract JSON from response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('Invalid response format')
      }

      const generatedSlides = JSON.parse(jsonMatch[0])

      // Add character counts
      const slidesWithCounts = generatedSlides.map(slide => ({
        ...slide,
        titleCount: slide.title.length,
        bodyCount: slide.body.length,
        totalCount: slide.title.length + slide.body.length
      }))

      setSlides(slidesWithCounts)
    } catch (err) {
      console.error(err)
      setError('Failed to generate slides. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyAllSlides = async () => {
    const allText = slides.map((slide, index) =>
      `SLIDE ${index + 1}:\n${slide.title}\n\n${slide.body}\n\n---\n`
    ).join('\n')

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(allText)
      } else {
        // Fallback for iOS
        const textarea = document.createElement('textarea')
        textarea.value = allText
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy. Please try again.')
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Instagram Content Generator
              </h1>
              <p className="text-gray-400">Security Stories Carousel Creator</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Access Generator
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              Demo only - Client-side API calls
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Instagram Content Generator</h1>
          <p className="text-gray-400">Create Professional Security Story Carousels</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Incident Type
              </label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select incident type...</option>
                {INCIDENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Venue Type
              </label>
              <select
                value={venueType}
                onChange={(e) => setVenueType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select venue type...</option>
                {VENUE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Story Details
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
              placeholder="Describe what happened... (e.g., Drunk patron became aggressive at 2 AM, refused to leave, started pushing other guests. Security approached calmly, spoke respectfully, offered water and taxi. Patron calmed down and left peacefully.)"
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={generateSlides}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loading ? 'Generating Slides...' : 'Generate Instagram Carousel'}
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
            <p className="text-gray-400 mt-4">Creating your carousel slides...</p>
          </div>
        )}

        {slides.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Carousel ({slides.length} slides)</h2>
              <button
                onClick={copyAllSlides}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                {copied ? 'Copied!' : 'Copy All Slides'}
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.map((slide, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 border-2 border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      SLIDE {index + 1}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {slide.totalCount} chars
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white">
                    {slide.title}
                  </h3>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {slide.body}
                  </p>

                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>Title: {slide.titleCount}</span>
                    <span>Body: {slide.bodyCount}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 rounded-lg p-4 text-center text-sm text-gray-400">
              Pro tip: Copy all slides and paste directly into your Instagram carousel creator
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
