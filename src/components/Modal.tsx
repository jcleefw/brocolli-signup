import React, { FormEvent } from 'react'
import styles from '../styles/Home.module.scss'
import cx from 'classnames'
import { MdClose } from 'react-icons/md'
import { Form, SuccessFormModal } from './ModalDisplay'
import { failedProps } from '../App'

interface ModalProps {
  modalOpen: boolean
  onCloseModalHandler: (e: React.MouseEvent | React.KeyboardEvent) => void
  submitted: boolean
  submitting: boolean
  onSubmitHandler: (e: FormEvent) => void
  failed: failedProps
  reset: () => void
}
export const Modal = (props: ModalProps) => {
  const {
    modalOpen,
    onCloseModalHandler,
    submitted,
    submitting,
    onSubmitHandler,
    failed,
    reset,
  } = props
  return (
    <>
      {modalOpen ? (
        <div
          className={cx(styles.modalContainer, { [styles.open]: modalOpen })}
          role="dialog"
          aria-labelledby="inviteButton"
        >
          <div className={styles.modal}>
            <button onClick={onCloseModalHandler} className={styles.buttonIcon}>
              <MdClose />
            </button>
            <div className={styles.modalDisplay}>
              {!submitted && (
                <Form
                  submitting={submitting}
                  onSubmitHandler={onSubmitHandler}
                  failed={failed}
                />
              )}
              {submitted && (
                <SuccessFormModal reset={reset} submitting={submitting} />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
