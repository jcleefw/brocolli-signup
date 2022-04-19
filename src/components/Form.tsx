import React, { useEffect } from 'react'
import { fetchHandler } from '../utils/fetch'
import styles from '../styles/Home.module.scss'
import cx from 'classnames'
import { FormValues } from './Modal'
import { InputController } from './InputController'

interface FormModalProps {
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  reactHookForm: any
}

export type Ref = HTMLFormElement
export const Form = (props: FormModalProps) => {
  const [errors, setErrors] = React.useState<any>({})
  const [submissionError, setSubmissionError] = React.useState<any>(undefined)
  const { control, handleSubmit, formState, reset, register } =
    props.reactHookForm
  useEffect(() => {
    if (formState.isSubmitSuccessful && !submissionError) {
      props.setSubmitted(true)
      reset()
    }
  }, [formState, reset, props, submissionError])

  const onError = (errors: any) => {
    setErrors(errors)
  }

  const onSubmitHandler = async (data: FormValues) => {
    setErrors({})
    setSubmissionError(undefined)

    await fetchHandler({ name: data.fullName, email: data.email })
      .then((res) => {
        setSubmissionError(undefined)
        return res
      })
      .catch((err: any) => {
        setSubmissionError(err.message)
      })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler, onError)}
        autoComplete="off"
        className={cx(styles.invitationForm, 'flex-column')}
        noValidate
      >
        <h3 className={styles.formTitle}>Request an invite</h3>
        <span className={styles.formDecorator}>---</span>
        <InputController
          {...{ errors, register, control }}
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: '3 characters or more',
            },
          }}
          labelText="Full name"
          fieldName="fullName"
        />
        <InputController
          {...{ errors, register, control }}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          labelText="Email"
          fieldName="email"
          type="email"
        />
        <InputController
          {...{ errors, register, control }}
          rules={{
            required: 'Confirm email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
            validate: (value) => {
              return (
                value === control._formValues.email || 'Email need to match'
              )
            },
          }}
          labelText="Confirm email"
          fieldName="confirmEmail"
          type="email"
        />

        <button
          className={cx(styles.button, styles.ctaButton, {
            [styles.disabled]: !formState.isValid,
          })}
          type="submit"
        >
          {formState.isSubmitting ? 'Submitting, please wait' : 'Send'}
        </button>
        {submissionError && (
          <p className={styles.formErrorMessage}>{submissionError}</p>
        )}
      </form>
    </>
  )
}
