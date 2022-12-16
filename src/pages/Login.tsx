import { Button, Input } from "antd";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import tractianLogo from "../assets/tractian-logo.svg";
import wave from "../assets/wave.svg";
import wave2 from "../assets/wave2.svg";
import wave3 from "../assets/wave3.svg";
import GoogleButton from "../components/GoogleButton";
import SectionBreak from "../components/SectionBreak";
import { connect } from "react-redux";

import "../pages/Login/Login.css";
import { authUser, getUserData } from "../services/login";
import { User } from "../interfaces/models/user.interface";
import { logUser } from "../store/actions";
import { useNavigate } from "react-router";

declare global {
  interface Window {
    handleGoogleToken: Function;
    google: any;
  }
}

interface Response {
  auth: boolean;
  email: String;
  token: String;
}

interface LoginProps {
  logUser: any;
  userLogged: any;
}

function Login(props: LoginProps) {
  const divGoogleButtonRender = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  window.handleGoogleToken = (response: Response, error: Error) => {
    try {
      if (error == undefined) {
        //token verify
        console.log(response);
      } else {
        // showMessage(
        //   "error",
        //   undefined,
        //   "There was an error!",
        //   `Google API returned an error. Error: ${error.message}`,
        //   undefined,
        //   undefined,
        //   "Okay"
        // );
      }
    } catch (error) {
      // showMessage(
      //   "error",
      //   undefined,
      //   "There was an error!",
      //   `We have an error while trying to verify Google Token in our API. Error: ${error.message}`,
      //   undefined,
      //   undefined,
      //   "Okay"
      // );
    }
  };

  const login = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };

    authUser(data).then((response: Response) => {
      handleToken(response.token, response.email);
    });
  };

  const handleToken = (token: String, email: String) => {
    getUserData(token, email)
      .then((response: any) => {
        props.logUser(response);
        navigate("/home");
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (window.google != undefined) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response: Response, error: Error) => window.handleGoogleToken(response, error),
      });

      window.google.accounts.id.renderButton(divGoogleButtonRender.current, {
        theme: "outline",
        size: "large",
        type: "standard",
        text: "sign_in_with",
        shape: "rectangular",
      });
    }
  }, []);

  return (
    <section className="h-screen w-full bg-gradient-to-r from-[#1e3b8c] to-[#2562e9] relative overflow-hidden">
      <div className="w-full h-20">
        <img src={tractianLogo} alt="tractian-logo" className="h-full py-7 mx-48" />
      </div>
      <h1 className="text-center font-extrabold text-7xl text-white">CHALLENGE</h1>
      <div className="bg-white w-[40%] min-h-[45%] h-auto my-12 mx-auto rounded-lg shadow-2xl relative z-50">
        <span className="block text-4xl font-light text-[#313131] text-center p-6">Welcome!</span>
        <GoogleButton refDiv={divGoogleButtonRender}></GoogleButton>
        <SectionBreak text="OR LOGIN WITH EMAIL"></SectionBreak>
        <form className="px-10">
          <Input
            placeholder="Type your email."
            className="mb-5"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Input>
          <Input
            placeholder="Type your password."
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
          <Button
            className="bg-[#2562e9] text-white font-bold outline-none block mx-auto w-full my-5"
            onClick={(e) => {
              login(e);
            }}
          >
            Sign In
          </Button>
        </form>
        <span className="block text-lg my-2 text-[#020024] text-center font-light">
          Forget Password?
        </span>
        <SectionBreak
          action={true}
          actionFunction={() => {
            //navigate("/signup");
          }}
          text="OR SIGN UP"
        ></SectionBreak>
      </div>
      <div className="">
        <img
          src={wave}
          alt="wave1"
          className="wave absolute w-full bottom-[-2rem] left-0 right-0 z-30"
        />
        <img
          src={wave2}
          alt="wave2"
          className="wave2 absolute w-full bottom-[-2rem] opacity-80 z-20"
        />
        <img
          src={wave3}
          alt="wave3"
          className="wave3 absolute w-full bottom-[-2rem] opacity-50 z-10"
        />
      </div>
    </section>
  );
}

const mapStateToProps = (state: any) => ({
  userLogged: state.userLogged,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    logUser: (user: User) => dispatch(logUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
