import { NavLink } from "react-router-dom";
import useForm from "../../hooks/useForm";
import InputGroup from "../../shared/inputGroup";
import {
  Button,
  FlexContainer,
  Form,
  FormContainer,
  Heading,
  P,
} from "../../ui/component.styled";
import {
  ButtonFlexContainer,
  FormBackgroundContainer,
} from "../../ui/container.styled";
import { handleLoginPostRequest } from "../../utils/fetchRequests";

const init = {
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is Required";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 6) {
    errors.password = "Password length must be 6 character";
  }

  return errors;
};

function Login() {
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
      handleLoginPostRequest(
        "/api/users/login",
        state.email.value.toString(),
        state.password.value.toString()
      );
      clear();
    }
  };

  return (
    <FormBackgroundContainer>
      <FlexContainer>
        <FormContainer>
          <Form onSubmit={(e) => handleSubmit(e, cb)}>
            <Heading>User Login Form</Heading>

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
              <P>
                Log as <NavLink to="/admin/login">Admin</NavLink>
              </P>
            </ButtonFlexContainer>

            <ButtonFlexContainer>
              <Button type="submit"> Submit </Button>

              <P>
                Don't have any account? please{" "}
                <NavLink to="/registration">Register</NavLink>
              </P>
            </ButtonFlexContainer>
          </Form>
        </FormContainer>
      </FlexContainer>
    </FormBackgroundContainer>
  );
}

export default Login;
