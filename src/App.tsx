import React, { FormEvent, useEffect } from 'react'
import styles from './styles/Home.module.scss'
import layoutStyles from './styles/Layout.module.scss'
import { Footer, Header } from './components'
import { fetchHandler } from './utils/fetch'
import cx from 'classnames'
import { Modal } from './components/Modal'

export type failedProps = {
  invalid: boolean
  msg?: string
}

function App() {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [failed, setFailed] = React.useState<failedProps>({ invalid: false })

  const onClickHandler = (e: React.MouseEvent | React.KeyboardEvent) => {
    setModalOpen(true)
  }
  const reset = () => {
    setSubmitting(false)
    setSubmitted(false)
    setFailed({ invalid: false })
    setModalOpen(false)
  }
  const onCloseModalHandler = () => {
    setModalOpen(false)
    reset()
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const formProps = Object.fromEntries(formData)

    const { email, confirm_email, name } = formProps
    const allFilledUp = Object.values(formData).every(
      (field: string) => field !== ''
    )

    const nameIsValid = String(name).length >= 3
    if (allFilledUp && nameIsValid && email === confirm_email) {
      try {
        setSubmitting(true)
        await fetchHandler(formProps)
          .then((res: Response) => {
            setSubmitting(false)
            return res
          })
          .then((res: Response) => {
            if (res.ok) {
              setSubmitted(true)
            } else {
              return res.json().then((err) => {
                const errMsg = err.errorMessage
                throw new Error(errMsg ?? 'Something went wrong')
              })
            }
          })
      } catch (err: any) {
        setFailed({ invalid: true, msg: err.message })
      }
    } else {
      setFailed({ invalid: true, msg: 'Form is invalid' })
    }
  }

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setModalOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])
  return (
    <div className={layoutStyles.container}>
      <Header />
      <main className={styles.main} role="main">
        <div className={cx(layoutStyles.innerContainer, styles.mainContent)}>
          <h2 className={styles.slogan}>
            A better way <br /> to enjoy every day.
          </h2>
          <p className={styles.caption}>Be the first to know when we launch</p>
          <button
            onClick={onClickHandler}
            className={cx(styles.button, styles.requestButton)}
            id="inviteButton"
          >
            Request an invite
          </button>
        </div>
      </main>
      <Footer />
      <Modal
        {...{
          modalOpen,
          onCloseModalHandler,
          submitted,
          submitting,
          onSubmitHandler,
          failed,
          reset,
        }}
      />
    </div>
  )
}

export default App
