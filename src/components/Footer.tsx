import styles from '../styles/Layout.module.scss'
import cx from 'classnames'
import { BsSuitHeartFill } from 'react-icons/bs'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={cx(styles.innerContainer, styles.footerContent)}>
        <p className={styles.footerNotes}>
          Made with
          <BsSuitHeartFill className={styles.loveIcon} />
          in Melbourne.
        </p>
        <p className={styles.footerNotes}>
          © 2021 Brocolli & Co. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
