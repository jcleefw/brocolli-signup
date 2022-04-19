import React, { useEffect } from 'react'
import styles from './styles/Home.module.scss'
import layoutStyles from './styles/Layout.module.scss'
import { Footer, Header } from './components'
import cx from 'classnames'
import { Modal } from './components/Modal'

export type failedProps = {
  invalid: boolean
  msg?: string
}

function App() {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const onClickHandler = () => {
    setModalOpen(true)
  }

  const onCloseModalHandler = () => {
    setModalOpen(false)
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
          setSubmitted,
        }}
      />
    </div>
  )
}

export default App
