export function handleChangeInputElement(
  event: React.FormEvent<HTMLInputElement>,
  state: any,
  setState: any
) {
  let target = event.target as HTMLInputElement;
  setState({ ...state, [target.name]: target.value });
}

export function handleChange(key: string, value: string | string[], state: any, setState: any) {
  setState({ ...state, [key]: value });
}
