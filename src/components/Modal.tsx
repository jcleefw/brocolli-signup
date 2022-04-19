import React from 'react'
import styles from '../styles/Home.module.scss'
import cx from 'classnames'
import { MdClose } from 'react-icons/md'
import { Form } from './Form'
import { SuccessFormModal } from './SuccessFormModal'
import { useForm } from 'react-hook-form'

interface ModalProps {
  modalOpen: boolean
  onCloseModalHandler: () => void
  submitted: boolean
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

export interface FormValues {
  fullName: string
  email: string
  confirmEmail: string
}

export const Modal = (props: ModalProps) => {
  const { modalOpen, onCloseModalHandler, setSubmitted, submitted } = props

  const reactHookForm = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const { reset } = reactHookForm

  const onResetHandler = () => {
    console.log('reset is clicked')
    reset()
    setSubmitted(false)
    onCloseModalHandler()
  }

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
                  setSubmitted={setSubmitted}
                  reactHookForm={reactHookForm}
                />
              )}
              {submitted && <SuccessFormModal onReset={onResetHandler} />}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
