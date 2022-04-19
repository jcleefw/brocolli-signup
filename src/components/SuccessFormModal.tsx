import React from 'react'
import cx from 'classnames'
import styles from '../styles/Home.module.scss'

interface SuccessFormModalProps {
  onReset: () => void
}
export const SuccessFormModal = ({ onReset }: SuccessFormModalProps) => {
  return (
    <>
      <h3 className={styles.formTitle}>All Done!</h3>
      <span className={styles.formDecorator}>---</span>
      <p>
        You will be one of the first to experience Brocolli & Co. when we launch
      </p>
      <button className={cx(styles.button, styles.ctaButton)} onClick={onReset}>
        OK
      </button>
    </>
  )
}
