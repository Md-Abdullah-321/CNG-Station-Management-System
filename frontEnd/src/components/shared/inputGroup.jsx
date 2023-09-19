import {
  Container,
  ErrorMessage,
  Label,
  TextInput,
} from "../ui/component.styled";

const InputGroup = ({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        name={name}
        id={name}
        placeholder={placeholder ?? ""}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default InputGroup;
