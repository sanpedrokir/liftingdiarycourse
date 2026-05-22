export type WorkoutSet = { reps: number; weight: number }
export type Exercise = { id: string; name: string; sets: WorkoutSet[] }
export type Workout = { id: string; date: string; exercises: Exercise[] }

const KEY = 'lifting-diary-workouts'

export function getWorkouts(): Workout[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function saveWorkout(workout: Workout): void {
  const workouts = getWorkouts()
  workouts.unshift(workout)
  localStorage.setItem(KEY, JSON.stringify(workouts))
}
