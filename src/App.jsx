import { useState, useEffect } from 'react'
import { Plus, Trophy, Calendar, TrendingUp, X, CheckCircle2, Circle } from 'lucide-react'

const STORAGE_KEY = 'next100days_challenges'

function App() {
  const [challenges, setChallenges] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newChallenge, setNewChallenge] = useState({ name: '', description: '', startDate: '' })

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setChallenges(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (challenges.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(challenges))
    }
  }, [challenges])

  const addChallenge = () => {
    if (!newChallenge.name || !newChallenge.startDate) return

    const challenge = {
      id: Date.now(),
      name: newChallenge.name,
      description: newChallenge.description,
      startDate: newChallenge.startDate,
      completedDays: [],
      createdAt: new Date().toISOString()
    }

    setChallenges([...challenges, challenge])
    setNewChallenge({ name: '', description: '', startDate: '' })
    setShowAddForm(false)
  }

  const deleteChallenge = (id) => {
    setChallenges(challenges.filter(c => c.id !== id))
  }

  const toggleDay = (challengeId, dayNumber) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id !== challengeId) return challenge

      const completedDays = [...challenge.completedDays]
      const index = completedDays.indexOf(dayNumber)

      if (index > -1) {
        completedDays.splice(index, 1)
      } else {
        completedDays.push(dayNumber)
        completedDays.sort((a, b) => a - b)
      }

      return { ...challenge, completedDays }
    }))
  }

  const getDayNumber = (startDate) => {
    const start = new Date(startDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    start.setHours(0, 0, 0, 0)
    
    const diffTime = today - start
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays + 1
  }

  const getProgress = (challenge) => {
    const currentDay = getDayNumber(challenge.startDate)
    const completed = challenge.completedDays.length
    const percentage = (completed / 100) * 100
    const streak = calculateStreak(challenge.completedDays, currentDay)
    
    return { currentDay, completed, percentage, streak }
  }

  const calculateStreak = (completedDays, currentDay) => {
    if (completedDays.length === 0) return 0
    
    let streak = 0
    for (let i = currentDay; i >= 1; i--) {
      if (completedDays.includes(i)) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Trophy className="w-12 h-12" />
            Next 100 Days
          </h1>
          <p className="text-white/90 text-xl">Track your journey, one day at a time</p>
        </header>

        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Challenge
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-xl shadow-2xl p-6 mb-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Challenge</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Challenge Name *
                </label>
                <input
                  type="text"
                  value={newChallenge.name}
                  onChange={(e) => setNewChallenge({ ...newChallenge, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Learn Spanish"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="What do you want to achieve?"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={newChallenge.startDate}
                  onChange={(e) => setNewChallenge({ ...newChallenge, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addChallenge}
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false)
                    setNewChallenge({ name: '', description: '', startDate: '' })
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {challenges.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-white/50" />
            <p className="text-white text-xl">No challenges yet. Create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map(challenge => {
              const { currentDay, completed, percentage, streak } = getProgress(challenge)
              const daysRemaining = Math.max(0, 100 - currentDay + 1)

              return (
                <div key={challenge.id} className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{challenge.name}</h3>
                      {challenge.description && (
                        <p className="text-gray-600 text-sm mb-2">{challenge.description}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Started: {formatDate(challenge.startDate)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteChallenge(challenge.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-primary-600">
                        {completed} / 100 days
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-700 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-primary-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600">{currentDay}</div>
                      <div className="text-xs text-gray-600">Current Day</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{streak}</div>
                      <div className="text-xs text-gray-600">Day Streak</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{daysRemaining}</div>
                      <div className="text-xs text-gray-600">Remaining</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-10 gap-1 mb-2">
                      {Array.from({ length: 100 }, (_, i) => i + 1).map(day => {
                        const isCompleted = challenge.completedDays.includes(day)
                        const isToday = day === currentDay
                        const isPast = day < currentDay
                        const isFuture = day > currentDay

                        return (
                          <button
                            key={day}
                            onClick={() => toggleDay(challenge.id, day)}
                            disabled={isFuture}
                            className={`
                              w-full aspect-square rounded text-xs font-semibold
                              transition-all hover:scale-110
                              ${isCompleted 
                                ? 'bg-green-500 text-white' 
                                : isToday 
                                ? 'bg-primary-500 text-white ring-2 ring-primary-300' 
                                : isPast 
                                ? 'bg-gray-200 text-gray-400 hover:bg-gray-300' 
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                              }
                            `}
                            title={`Day ${day}`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-3 h-3 mx-auto" />
                            ) : (
                              <Circle className="w-3 h-3 mx-auto" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Click days to mark as complete
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default App



