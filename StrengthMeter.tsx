import { useEffect, useState } from "react";
import "./StrengthMeter.css";

interface Props {
  password: string;
}

const StrengthMeter = ({ password }: Props) => {
  const [pwdValue, setPwdValue] = useState("");
  const [pwdStrength, setPwdStrength] = useState(0);

  useEffect(() => {
    const validateRegex = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];

    const passwordChecker = () => {
      let pwdCheck = 0;

      validateRegex.forEach((regex) => {
        if (new RegExp(regex).test(password)) {
          pwdCheck += 1;
        }
      });

      switch (pwdCheck) {
        case 0:
          setPwdStrength(0);
          return setPwdValue("");

        case 1:
          setPwdStrength(1);
          return setPwdValue("weak");

        case 2:
          setPwdStrength(2);
          return setPwdValue("medium");

        case 3:
          setPwdStrength(3);
          return setPwdValue("good");

        case 4:
          setPwdStrength(4);
          return setPwdValue("strong");

        default:
          return null;
      }
    };

    passwordChecker();
  }, [password]);

  return (
    <>
      <div className="wrapper">
        <p className="pwd-label">
          {password && (
            <div>
              <p className={`label strength-${pwdValue}`}>
                Password strength - {pwdValue}
              </p>
            </div>
          )}
        </p>
        <progress
          className={`pwd-checker-bar strength-${pwdValue}`}
          value={pwdStrength}
          max="4"
        />
        <br />
      </div>
    </>
  );
};
export default StrengthMeter;
