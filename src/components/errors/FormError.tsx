interface IProps {
  message: string
}
export function FormError(props: IProps) {
  return <p className='text-red-500 text-xs italic'>{props.message}</p>
}
