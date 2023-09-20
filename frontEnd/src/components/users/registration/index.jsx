import { NavLink } from "react-router-dom";
import useForm from "../../hooks/useForm";
import InputGroup from "../../shared/inputGroup";
import {
  Button,
  FlexContainer,
  Form,
  FormContainer,
  Heading,
  InputFile,
  P,
} from "../../ui/component.styled";
import {
  ButtonFlexContainer,
  FormBackgroundContainer,
} from "../../ui/container.styled";

const init = {
  name: "",
  email: "",
  address: "",
  phone: "",
  reg_number: "",
  license_number: "",
  password: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is Required";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  }

  if (!values.address) {
    errors.address = "Address is Required";
  }

  if (!values.reg_number) {
    errors.reg_number = "Registration number is Required";
  }

  if (!values.license_number) {
    errors.license_number = "License number is Required";
  }

  if (!values.phone) {
    errors.phone = "Phone is Required";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 6) {
    errors.password = "Password length must be 6 character";
  }

  return errors;
};

function Registration() {
  const {
    formState: state,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    clear,
  } = useForm({ init, validate });

  const cb = ({ hasError, values, errors }) => {
    if (hasError) {
      alert("[ERROR]" + " Please, fill all the input field");
    } else {
      alert("[SUCCESS]" + " User created successfully");
    }
  };

  console.log(state);
  return (
    <FormBackgroundContainer>
      <FlexContainer>
        <FormContainer>
          <Form onSubmit={(e) => handleSubmit(e, cb)}>
            <Heading>Registration Form</Heading>
            <InputGroup
              label="Name"
              name="name"
              placeholder="Enter your name"
              value={state.name.value}
              type="text"
              error={state.name.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <InputGroup
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={state.email.value}
              type="email"
              error={state.email.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <InputGroup
              label="Phone"
              name="phone"
              placeholder="Enter your Phone"
              value={state.phone.value}
              type="text"
              error={state.phone.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <InputGroup
              label="Address"
              name="address"
              placeholder="Enter your address"
              value={state.address.value}
              type="text"
              error={state.address.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <InputGroup
              label="Registration number"
              name="reg_number"
              placeholder="Enter your Registration number"
              value={state.reg_number.value}
              type="text"
              error={state.reg_number.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <InputGroup
              label="License number"
              name="license_number"
              placeholder="Enter your license number"
              value={state.license_number.value}
              type="text"
              error={state.license_number.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <InputFile type="file" />

            <InputGroup
              label="Password"
              name="password"
              placeholder="Enter your password"
              value={state.password.value}
              type="password"
              error={state.password.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <ButtonFlexContainer>
              <Button type="submit" onClick={clear}>
                {" "}
                Submit{" "}
              </Button>

              <P>
                Already have an account? please{" "}
                <NavLink to="/login">Login</NavLink>
              </P>
            </ButtonFlexContainer>
          </Form>
        </FormContainer>
      </FlexContainer>
    </FormBackgroundContainer>
  );
}

export default Registration;
