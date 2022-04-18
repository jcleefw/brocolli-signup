import styles from '../styles/Layout.module.scss'
import cx from 'classnames'

export const Header = () => {
  return (
    <header className={cx(styles.header, 'flex-column')}>
      <div className={styles.innerContainer}>
        <div className="logo">BROCOLLI & CO.</div>
      </div>
    </header>
  )
}
