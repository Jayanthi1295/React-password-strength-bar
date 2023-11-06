import { themeSMB } from "Components/styled-components/common";
import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import StrengthMeter from "./StrengthMeter/StrengthMeter";

interface Props {
  changePasswordScreen: any;
}

interface FormValues {
  // Represent the username field on the form
  password1: string;
  password2: string;
}

export interface ErrorFields {
  // Represent the username field on the form when there is an error associated to it
  password1: boolean;
  // Represent the code field on the form when there is an error associated to it
  password2: boolean;
  // Represent the form it self when there is an error associated to it
  form: string;
}

const FormContainer = styled.form`
  width: 100%;
`;
// Main container for the form
const FormMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 20px;
  position: relative;
  width: 100%;
  &.formError [data-type="inputContainer"] {
    border-color: ${themeSMB.text.errorText};
    input {
      color: ${themeSMB.text.errorText};
    }
  }
`;

// Container for each input field
const InputContainer = styled.div`
  border: 2px solid #e8e8ea;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  height: 56px;
  justify-content: center;
  padding: 8px 16px;
  width: 100%;
  &:focus-within {
    border: 1px solid #283cf4;
  }
`;

// Label for the input field
const Label = styled.label`
  color: ${themeSMB.text.description};
  font-size: ${themeSMB.fontSize.small};
  height: 16px;
`;

// Input field, taken into consideration the filled and focus class/state the
// input could have as they will make the input have a different look
const Input = styled.input`
  background: none;
  background-color: transparent;
  border: none;
  color: #000;
  font-size: ${themeSMB.fontSize.small};
  font-weight: ${themeSMB.fontWeight.light};
  height: 56px;
  width: 100%;
  max-width: 100%;
  transition: height 0.3s ease;
  &.filled,
  &:focus {
    height: 24px;
    outline: none;
  }
`;

// Container for form actions
const FormActionsContainer = styled.div`
  position: relative;
  text-align: left;
  width: 100%;
`;

// Container for displaying errors
const Errors = styled.div`
  position: absolute;
  text-align: left;
  top: 8px;
  width: 100%;
`;

// Container for form actions
const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
`;

// Container for each input field
const LoginContainer = styled.div`
  padding-top: 30px;
`;
// Button component with the disabled option that will preven the user from submitting the form
const Button = styled.button`
  align-self: center;
  background-color: ${themeSMB.button.active.backgroundColor};
  border-radius: 0px;
  border: 0.5px solid #cdcdcd;
  color: ${themeSMB.button.active.color};
  height: 50px;
  width: 100%;
  font-size: 16px;
  &:disabled {
    border-radius: 0px;
    border: 0.5px solid #cdcdcd;
    background: rgba(128, 158, 255, 0.5);
    cursor: not-allowed;
  }
`;

const ChangePassword = ({ changePasswordScreen }: Props): JSX.Element => {
  // using Hook Form to capture the changes in different fields
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  // The errors are stored in this state and handle outside the hook.
  const [errors, setError] = useState<ErrorFields>({
    password1: false,
    password2: false,
    form: "",
  });
  // Serves as a way to store the values of the form
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    password1: "",
    password2: "",
  });
  const [strength, setStrength] = useState(0);

  /**
   * Handles the onChange event for the input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the change event.
   * @return {void} This function does not return anything.
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.name as keyof FormValues, e.target.value);
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    // error handling cleanup
    if (e.target.value !== "")
      setError((errors) => ({ ...errors, [e.target.name]: false, form: "" }));
  };

  /**
   * Validates the required fields in the form values and sets the error state if needed
   *
   * @param {FormValues} requiredField - The form values to validate.
   * @return {void} This function does not return a value.
   */
  const requiredFieldValidation = (requiredField: FormValues): void => {
    // validation to see if username is present
    if (!requiredField.password1)
      setError((errors) => ({ ...errors, password1: true }));
    // validation to see if password is present
    if (!requiredField.password2)
      setError((errors) => ({ ...errors, password2: true }));
  };

  /**
   * Prints an error message based on the provided type and optional message.
   *
   * @param {string} type - The type of error message to print.
   * @param {string} message - An optional message to display along with the error.
   * @returns {JSX.Element | undefined} - The error message component or undefined if no error is found.
   */
  const printErrorMessage = (
    type: string,
    message?: string
  ): JSX.Element | undefined => {
    if (errors && errors[type as keyof ErrorFields])
      return (
        <ErrorMessage
          message={
            message ? message : (errors[type as keyof ErrorFields] as string)
          }
        />
      );
  };

  /**
   * Determines whether the CTA button should be disabled.
   *
   * @return {boolean} - Returns true if either the username or password is empty, otherwise returns false.
   */
  const isDissabledCTA = (): boolean => {
    return formValues.password1 === "" || formValues.password2 === ""
      ? true
      : false;
  };

  /**
   * Submits the account fields and performs validation.
   *
   * @param {FormValues} accountFields - The account fields to be submitted.
   * @return {Promise<void>} A promise that resolves when the submission is complete.
   */
  const onSubmit = async (accountFields: FormValues): Promise<void> => {
    requiredFieldValidation(accountFields);
    const { password1, password2 } = accountFields;
    // This works as a way to capture different fields as string into the array
    // validation to see if the submited data is valid
    if (
      typeof password1 !== "undefined" &&
      password1 &&
      typeof password2 !== "undefined" &&
      password2
    ) {
      console.log("logged inn");
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 700,
            textAlign: "center",
            margin: "1rem 0",
          }}
        >
          Change Password
        </h1>
        <p
          style={{
            width: "70%",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          Password Policy
        </p>
        <ul>
          <li>Cannot be any of the previous 1 passwords</li>
          <li>Must have at least 1 special character</li>
          <li>Must have at least 1 upper case character</li>
          <li>Must have at least 1 lower case character</li>
          <li>Must have at least 8 characters</li>
          <li>Cannot have spaces</li>
        </ul>

        <FormMainContainer
          data-type="FormMainContainer"
          className={errors.form === "" ? "" : "formError"}
        >
          <InputContainer data-type="inputContainer">
            <Label htmlFor="username">New password</Label>
            <Input
              ref={register()}
              type="password"
              id="password1"
              name="password1"
              onChange={onChange}
              data-type="inputTextUsername"
              className={formValues.password1 === "" ? "" : "filled"}
            />
            {printErrorMessage("password1", "This field is required")}
          </InputContainer>
          <StrengthMeter password={formValues.password1} />
          <InputContainer data-type="inputContainer">
            <Label htmlFor="code">Re-type password</Label>
            <Input
              ref={register()}
              type={"text"}
              id="password2"
              name="password2"
              onChange={onChange}
              className={formValues.password2 === "" ? "" : "filled"}
            />
            {printErrorMessage("password2", "This field is required")}
          </InputContainer>
        </FormMainContainer>

        <FormActionsContainer>
          <Errors>{printErrorMessage("form")}</Errors>
          <Actions data-type="actions">
            <LoginContainer data-type="LoginContainer">
              <Button
                disabled={isDissabledCTA()}
                data-type="loginButton"
                type="submit"
              >
                Continue
              </Button>
            </LoginContainer>
            <LoginContainer data-type="LoginContainer">
              <Button onClick={() => changePasswordScreen()}>Cancel</Button>
            </LoginContainer>
          </Actions>
        </FormActionsContainer>
      </FormContainer>
    </>
  );
};

export default ChangePassword;
