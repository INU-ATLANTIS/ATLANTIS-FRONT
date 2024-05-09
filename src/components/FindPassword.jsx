import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TopNavigation } from "../components/TopNavigation";
import { EmailCheck } from "../components/FindPassword/EmailCheck";
import Verification from "../components/FindPassword/Verification";
import { Password } from "../components/FindPassword/Password";

export default function Join() {
  const [step, setStep] = useState("emailCheck");

  const [email, setEmail] = useState("");
  const [verificationNum, setVerificationNum] = useState();

  const navigate = useNavigate();

  return (
    <Container>
      <TopNavigation
        onBack={() => {
          if (step === "emailCheck") {
            navigate(-1);
          } else if (step === "verification") {
            setStep("emailCheck");
          } else {
            setStep("verification");
          }
        }}
      />

      {step === "emailCheck" ? (
        <EmailCheck
          onNext={(email) => {
            setStep("verification");
            setEmail(email);
          }}
        />
      ) : step === "verification" ? (
        <Verification
          email={email}
          onNext={(verificationNum) => {
            setStep("password");
            setVerificationNum(verificationNum);
          }}
        />
      ) : (
        <Password email={email} verificationNum={verificationNum} />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
