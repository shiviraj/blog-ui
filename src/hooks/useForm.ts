import { useState } from 'react'

const useForm = <T extends Record<string, unknown>>(initialValues: T) => {
  const [values, setValues] = useState<T>({ ...initialValues })

  const onChange = <K extends keyof T>(name: K, value: T[K]) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (onSubmit: (values: T) => void) => (event: Event) => {
    event.preventDefault()
    onSubmit(values)
  }

  return { onChange, values, handleSubmit }
}

export default useForm
