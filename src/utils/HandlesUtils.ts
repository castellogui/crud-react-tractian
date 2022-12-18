export default function handleChange(
  event: React.FormEvent<HTMLInputElement>,
  state: any,
  setState: any
) {
  let target = event.target as HTMLInputElement;
  setState({ ...state, [target.name]: target.value });
}
