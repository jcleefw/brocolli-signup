import { UseControllerProps, Controller } from 'react-hook-form'
import styles from '../styles/Home.module.scss'

interface InputControllerProps {
  labelText: string
  type?: string
  fieldName: any
  rules: UseControllerProps['rules']
  errors: any
  control: UseControllerProps['control']
  register: any
}
export const InputController = ({
  labelText,
  type = 'text',
  fieldName,
  rules,
  errors,
  control,
  register,
}: InputControllerProps) => {
  return (
    <div className={styles.formField}>
      <label className={styles.formFieldLabel}>{labelText}</label>
      <Controller
        control={control}
        name={fieldName}
        rules={rules}
        render={({ field }) => (
          <input
            className={styles.formFieldInput}
            type={type}
            placeholder={labelText}
            {...register(fieldName)}
          />
        )}
      />

      {errors[fieldName] && (
        <span className={styles.formFieldError}>
          {errors[fieldName].message}
        </span>
      )}
    </div>
  )
}
