'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormError } from '@/components/errors/FormError'

import routes from '@/config/routes'

import styles from './styles.module.scss'
import { AuthService } from '@/services/auth.service'

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ILogin>({
    mode: 'onChange'
  })
  //const queryClient = useQueryClient()
  const { mutate, isError } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: ILogin) => AuthService.main(data),
    async onSuccess() {
      reset()
      // await queryClient.invalidateQueries({ queryKey: ['cart'] })
      push(routes.HOME)
    }
  })

  const { push, refresh } = useRouter()
  const onSubmit: SubmitHandler<ILogin> = (data) => {
    mutate(data)
  }
  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            email
          </label>
          <input
            {...register('email', {
              required: {
                value: true,
                message: 'Поле обязательно к заполнению!'
              },
              maxLength: 40
            })}
            id='username'
            type='text'
            placeholder='Введите email'
          />
          {errors?.email?.message && (
            <FormError message={errors.email.message} />
          )}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2 dark:text-text-dark'
            htmlFor='password'
          >
            Пароль
          </label>
          <input
            className={
              'dark:text-text-dark dark:bg-bg-dark-secondary dark:border-none'
            }
            {...register('password', {
              required: {
                value: true,
                message: 'Поле обязательно к заполнению!'
              },
              maxLength: {
                value: 64,
                message: 'Максимальная длина - 64'
              },
              minLength: {
                value: 3,
                message: 'Минимальная длина - 3'
              }
            })}
            id='password'
            type='password'
            placeholder='******************'
          />
          {errors?.password?.message && (
            <FormError message={errors.password.message} />
          )}
        </div>
        <div className='flex items-center justify-between'>
          <input
            className={'bg-deep max-w-28'}
            value={'Войти'}
            type='submit'
          ></input>
          <div className={'flex items-center'}>
            <span className={'text-gray-400 text-xxs mr-1'}>Нет аккаунта?</span>
            <button
              onClick={() => push('/register')}
              className='inline-block align-baseline font-bold text-sm text-soft
                hover:text-deep'
            >
              Регистрация
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
