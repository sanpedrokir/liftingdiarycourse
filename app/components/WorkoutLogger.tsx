'use client'

import { useState } from 'react'
import { saveWorkout, type Exercise, type WorkoutSet } from '@/lib/storage'

function generateId() {
  return Math.random().toString(36).slice(2)
}

function emptyExercise(): Exercise {
  return { id: generateId(), name: '', sets: [{ reps: 0, weight: 0 }] }
}

export default function WorkoutLogger() {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [exercises, setExercises] = useState<Exercise[]>([emptyExercise()])
  const [saved, setSaved] = useState(false)

  function addExercise() {
    setExercises(prev => [...prev, emptyExercise()])
  }

  function removeExercise(id: string) {
    setExercises(prev => prev.filter(e => e.id !== id))
  }

  function updateExerciseName(id: string, name: string) {
    setExercises(prev => prev.map(e => (e.id === id ? { ...e, name } : e)))
  }

  function addSet(exerciseId: string) {
    setExercises(prev =>
      prev.map(e =>
        e.id === exerciseId ? { ...e, sets: [...e.sets, { reps: 0, weight: 0 }] } : e
      )
    )
  }

  function removeSet(exerciseId: string, setIndex: number) {
    setExercises(prev =>
      prev.map(e =>
        e.id === exerciseId ? { ...e, sets: e.sets.filter((_, i) => i !== setIndex) } : e
      )
    )
  }

  function updateSet(exerciseId: string, setIndex: number, field: keyof WorkoutSet, value: number) {
    setExercises(prev =>
      prev.map(e =>
        e.id === exerciseId
          ? { ...e, sets: e.sets.map((s, i) => (i === setIndex ? { ...s, [field]: value } : s)) }
          : e
      )
    )
  }

  function handleSave() {
    saveWorkout({ id: generateId(), date, exercises })
    setSaved(true)
    setExercises([emptyExercise()])
    setDate(new Date().toISOString().split('T')[0])
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">Log Workout</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div className="space-y-4">
          {exercises.map(exercise => (
            <div
              key={exercise.id}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Exercise name (e.g. Bench Press)"
                  value={exercise.name}
                  onChange={e => updateExerciseName(exercise.id, e.target.value)}
                  className="flex-1 border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 bg-transparent text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400"
                />
                {exercises.length > 1 && (
                  <button
                    onClick={() => removeExercise(exercise.id)}
                    className="text-sm text-zinc-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>

              <table className="w-full text-sm mb-3">
                <thead>
                  <tr className="text-left text-zinc-500 dark:text-zinc-400">
                    <th className="pb-2 font-medium w-10">Set</th>
                    <th className="pb-2 font-medium">Weight (kg)</th>
                    <th className="pb-2 font-medium">Reps</th>
                    <th className="pb-2 w-6" />
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map((set, setIndex) => (
                    <tr key={setIndex}>
                      <td className="py-1 pr-4 text-zinc-500">{setIndex + 1}</td>
                      <td className="py-1 pr-3">
                        <input
                          type="number"
                          min={0}
                          value={set.weight || ''}
                          onChange={e =>
                            updateSet(exercise.id, setIndex, 'weight', Number(e.target.value))
                          }
                          className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-2 py-1 w-24 bg-transparent text-zinc-900 dark:text-zinc-50"
                        />
                      </td>
                      <td className="py-1 pr-3">
                        <input
                          type="number"
                          min={0}
                          value={set.reps || ''}
                          onChange={e =>
                            updateSet(exercise.id, setIndex, 'reps', Number(e.target.value))
                          }
                          className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-2 py-1 w-24 bg-transparent text-zinc-900 dark:text-zinc-50"
                        />
                      </td>
                      <td className="py-1">
                        {exercise.sets.length > 1 && (
                          <button
                            onClick={() => removeSet(exercise.id, setIndex)}
                            className="text-zinc-400 hover:text-red-500 text-lg leading-none"
                          >
                            ×
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={() => addSet(exercise.id)}
                className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                + Add set
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addExercise}
          className="mt-4 w-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl py-3 text-zinc-400 hover:border-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          + Add exercise
        </button>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-xl py-3 font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          Save Workout
        </button>

        {saved && (
          <p className="mt-4 text-center text-green-600 dark:text-green-400 font-medium">
            Workout saved!
          </p>
        )}
      </div>
    </div>
  )
}
