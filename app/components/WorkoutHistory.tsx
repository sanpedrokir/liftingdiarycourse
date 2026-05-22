'use client'

import { useEffect, useState } from 'react'
import { getWorkouts, deleteWorkout, type Workout } from '@/lib/storage'

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function summarizeSets(sets: Workout['exercises'][number]['sets']) {
  return sets.map(s => `${s.reps} × ${s.weight}kg`).join(', ')
}

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    setWorkouts(getWorkouts())
  }, [])

  function handleDelete(id: string) {
    deleteWorkout(id)
    setWorkouts(prev => prev.filter(w => w.id !== id))
  }

  if (workouts.length === 0) {
    return (
      <div className="text-center py-20 text-zinc-400 dark:text-zinc-600">
        <p className="text-lg">No workouts logged yet.</p>
        <p className="text-sm mt-1">Head to Log to record your first session.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {workouts.map(workout => (
        <div
          key={workout.id}
          className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5"
        >
          <div className="flex items-start justify-between mb-4">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
              {formatDate(workout.date)}
            </h2>
            <button
              onClick={() => handleDelete(workout.id)}
              className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
            >
              Delete
            </button>
          </div>

          <div className="space-y-3">
            {workout.exercises.map(exercise => (
              <div key={exercise.id}>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {exercise.name || 'Unnamed exercise'}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {exercise.sets.length} {exercise.sets.length === 1 ? 'set' : 'sets'} —{' '}
                  {summarizeSets(exercise.sets)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
