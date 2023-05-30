'use client'
import { useRouter } from 'next/navigation'
import { useRef, useState, SyntheticEvent, MouseEvent } from 'react'
import LoadingButton from './LoadingButton'

export default function StartForm () {
  const router = useRouter()
  const loginForm = useRef<HTMLFormElement>(null)

  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function loginUser () {
    if (!loginForm.current?.reportValidity()) return
    setErrorMsg('')
    setLoading(true)

    const formData = new FormData(loginForm.current as HTMLFormElement)
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      cache: 'no-cache'
    })

    if (!res.ok) {
      if (res.status < 500) {
        const { message } = await res.json()
        setErrorMsg(message)
      } else {
        setErrorMsg('Server error, try again later')
      }
      return setLoading(false)
    }
    router.replace('/app/chat', { forceOptimisticNavigation: true })
  }

  function handleSubmitForm (evt: SyntheticEvent<HTMLFormElement>) {
    console.log('handleSubmitForm')
    evt.preventDefault()
    if (!loading) {
      loginUser().catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
  }

  function handleStartClick (evt: MouseEvent<HTMLButtonElement>) {
    if (showForm) return

    evt.preventDefault() // Don't emit submit event
    setShowForm(true)

    if (loginForm.current) {
      const elements = loginForm.current.elements
      const usernameInput = elements.namedItem('username') as HTMLInputElement | undefined
      usernameInput?.focus()
    }
  }

  return (
    <form onSubmit={handleSubmitForm} ref={loginForm} className='flex flex-col min-w-full'>

      <div className={['collapse', showForm ? 'collapse-open' : 'collapse-close invisible'].join(' ')}>

        <div className='collapse-content form-control max-w-xs'>
          <label className='label'>
            <span className='label-text'>What is your username?</span>
          </label>

          <input
            tabIndex={showForm ? 0 : -1}
            type='text'
            name='username'
            placeholder='Username'
            className={['input input-bordered max-w-xs', errorMsg ? 'input-error' : ''].join(' ')}
            required
          />

          <div className={`group ${errorMsg ? 'is-error' : ''}`}>
            <div className='invisible group-[.is-error]:visible'>
              <label className='label'>
                <span className='label-text-alt text-error'>{errorMsg || '-'}</span>
              </label>
            </div>
          </div>

        </div>

      </div>

      <LoadingButton
        type={showForm ? 'submit' : 'button'}
        onClick={handleStartClick}
        className='btn-primary mx-5'
        tabIndex={0}
        isLoading={loading}
      >{showForm ? 'Send' : 'Start'}
      </LoadingButton>
    </form>
  )
}
