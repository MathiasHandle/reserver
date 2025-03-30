import { FormLabel } from '../ui/form'

type Props = {
  text: string
}

function InputLabel(props: Props) {
  return <FormLabel className="text-md font-semibold">{props.text}</FormLabel>
}

export default InputLabel
