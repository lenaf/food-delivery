import React, { useState } from "react";
import { Alert, Button, Input, Row } from "antd";
import googleLogo from "../images/googleLogo.png";

interface IProps {
  signInWithGoogle: () => any;
  signInWithEmailAndPassword: (email: string, password: string) => any;
  createUserWithEmailAndPassword: (email: string, password: string) => any;
  error: any;
  loading: boolean;
}

const LoggedOut: React.FC<IProps> = ({
  signInWithGoogle,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  loading,
  error,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="flex h-full">
      <div className="mx-auto">
        <h1 className="mb-8 text-8xl font-bold	">Lets Find Some Food</h1>
        <Row className="mb-2">
          <Input
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-xs	"
          />
        </Row>
        <Row className="mb-2">
          <Input.Password
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="max-w-xs	"
          />
        </Row>
        {isSignUp && (
          <Row className="mb-2">
            <Input.Password
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="max-w-xs	"
            />
          </Row>
        )}
        {error && <Alert className="mb-2" message={error} type="error" />}
        <Row className="mb-2">
          <Button
            type="primary"
            loading={loading}
            disabled={
              !email || !password || (isSignUp && password !== confirmPassword)
            }
            onClick={() =>
              isSignUp
                ? createUserWithEmailAndPassword(email, password)
                : signInWithEmailAndPassword(email, password)
            }
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
        </Row>
        <Row className="mb-2">
          <Button onClick={signInWithGoogle}>
            <Row>
              <img
                className="mr-2"
                alt="Google Logo"
                width="20px"
                src={googleLogo}
              />
              <div>Sign {isSignUp ? "up" : "in"} with Google</div>
            </Row>
          </Button>
        </Row>
        <Row align="middle">
          <div>Don't have an account?</div>
          <Button
            className="-ml-2"
            onClick={() => setIsSignUp(!isSignUp)}
            type="link"
          >
            Sign Up
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default LoggedOut;
