'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { FormError } from '@/components/errors/FormError'

import styles from './styles.module.scss'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegister>({
    mode: 'onChange'
  })

  const { push } = useRouter()

  function onSubmit() {}
  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4 '>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            Ваше имя
          </label>
          <input
            {...register('username', {
              required: {
                value: true,
                message: 'Поле обязательно к заполнению!'
              },
              maxLength: 40
            })}
            id='username'
            type='text'
            placeholder='Введите имя'
          />
          {errors?.username?.message && (
            <FormError message={errors.username.message} />
          )}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            Email
          </label>
          <input
            {...register('email', {
              required: {
                value: true,
                message: 'Поле обязательно к заполнению!'
              },
              pattern: {
                value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
                message: 'Email не валиден!'
              }
            })}
            id='email'
            type='text'
            placeholder='Email'
          />
          {errors?.email?.message && (
            <FormError message={errors.email.message} />
          )}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Пароль
          </label>
          <input
            {...register('password', {
              required: {
                value: true,
                message: 'Поле обязательно к заполнению!'
              },
              maxLength: {
                value: 64,
                message: 'максимальная длина - 64'
              },
              minLength: {
                value: 8,
                message: 'минимальная длина - 8'
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
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Повторите пароль
          </label>
          <input
            {...register('secondPassword', {
              required: {
                value: true,
                message: 'Поле обязательно к заполнению!'
              },
              maxLength: {
                value: 64,
                message: 'максимальная длина - 64'
              },
              minLength: {
                value: 8,
                message: 'минимальная длина - 8'
              }
            })}
            id='secondpassword'
            type='password'
            placeholder='******************'
          />
          {errors?.secondPassword?.message && (
            <FormError message={errors.secondPassword.message} />
          )}
        </div>
        <div className='flex items-center justify-between'>
          <input
            value={'Регистрация'}
            type='submit'
            className={'bg-deep max-w-40'}
          ></input>
          <div className={'flex items-center'}>
            <span className={'text-gray-400 text-xxs mr-1'}>
              Уже зарегистрированы?
            </span>
            <button
              className='inline-block align-baseline font-bold text-sm text-soft
                hover:text-deep'
              onClick={() => push('/login')}
            >
              Войти
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
