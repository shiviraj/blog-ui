import {useCallback, useState} from 'react'

const useForm = ({...initialValues} = {}) => {
  const [values, setValues] = useState(initialValues || {})

  const onChange = useCallback(
    (name, value) => {
      setValues((oldValues) => ({...oldValues, [name]: value}))
    },
    [setValues]
  )

  const setValue = useCallback(
    (name, value) => {
      setValues({...values, [name]: value})
    },
    [setValues]
  )

  const handleSubmit = (onSubmit) => (event) => {
    event.preventDefault()
    const finalValues = Object.keys(values).reduce((acc, curr) => {
      let el = null
      try {
        // eslint-disable-next-line prefer-destructuring
        el = document.getElementsByName(curr)[0]
        // eslint-disable-next-line no-empty
      } catch (err) {
      }

      return el ? {...acc, [curr]: values[curr]} : acc
    }, {})
    return onSubmit(finalValues)
  }

  return {onChange, values, handleSubmit, setValue}
}

export default useForm
