export default function LoadingPage () {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-bold'>Loading</h1>
        <div className='btn btn-circle btn-xl btn-ghost loading' />
      </div>
    </main>
  )
}
