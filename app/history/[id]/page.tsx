import WorkoutEditForm from './WorkoutEditForm'

export default async function EditWorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">Edit Workout</h1>
        <WorkoutEditForm id={id} />
      </div>
    </div>
  )
}
