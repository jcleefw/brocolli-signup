import React, { FormEvent, forwardRef } from 'react'
import cx from 'classnames'
import styles from '../styles/Home.module.scss'
import { failedProps } from '../App'

interface SuccessFormModalProps {
  submitting: boolean
  reset: () => void
}
export const SuccessFormModal = ({
  submitting,
  reset,
}: SuccessFormModalProps) => {
  return (
    <>
      <h3 className={styles.formTitle}>All Done!</h3>
      <span className={styles.formDecorator}>---</span>
      <p>
        You will be one of the first to experience Brocolli & Co. when we launch
      </p>
      <button
        disabled={submitting}
        className={cx(styles.button, styles.ctaButton)}
        onClick={reset}
      >
        OK
      </button>
    </>
  )
}

interface FormModalProps {
  submitting: boolean
  onSubmitHandler: (e: FormEvent) => void
  failed: failedProps
}

export type Ref = HTMLFormElement
export const Form = forwardRef<Ref, FormModalProps>((props, ref) => {
  const { onSubmitHandler, submitting, failed } = props
  return (
    <>
      <form
        className={cx(styles.invitationForm, 'flex-column')}
        id="invitation-form"
        onSubmit={onSubmitHandler}
        ref={ref}
      >
        <h3 className={styles.formTitle}>Request an invite</h3>
        <span className={styles.formDecorator}>---</span>
        <input
          name="name"
          type="text"
          placeholder="Full name"
          aria-label="full name"
          required
          minLength={3}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          aria-label="email"
          required
        />
        <input
          name="confirm_email"
          type="email"
          placeholder="Confirm email"
          aria-label="confirm email"
          required
        />
        <button
          disabled={submitting}
          className={cx(styles.button, styles.ctaButton)}
        >
          {submitting ? 'Sending, please wait' : 'Send'}
        </button>
      </form>
      {failed.invalid && (
        <div className={styles.formErrorMessage}>Error: {failed.msg}</div>
      )}
    </>
  )
})
