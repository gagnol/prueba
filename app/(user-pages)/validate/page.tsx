"use client";
import { FormEvent, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Input } from "@/components/ui/input";

function Validate() {
  const [error, setError] = useState();
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state.next);
console.log(userInfo)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const tokenResponse = await axios.post("/api/auth/validate", {
        token: formData.get("token"),
 
      });
      console.log(tokenResponse);


      return router.push("/reset");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };


  const [counter, setCounter] = useState(120);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (counter > 0) {
      timer = setInterval(() => setCounter(prevCounter => prevCounter - 1), 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [counter]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };


  return (
   <>
        <form onSubmit={handleSubmit} >
          {error && <div className="bg-red-500  p-2 mb-2">{error}</div>}

          <h1 className="text-[21px] font-bold pb-5">Verification required</h1>
          <h5>
            To continue, complete this verification step.
            We have sent a One Time Password (OTP) to the email
            <a className='px-1  font-semibold'>{userInfo.email} </a>
            <p>Please enter it below.</p>
          </h5>
          <label htmlFor="token"  >Enter OTP</label>
          <Input 
            type="text"
            placeholder="OTP"
            name="token"
            autoComplete="off"
          />

<Button  type='submit' style={{ width: "100%",marginTop:"10px" }}>
            Continue
          </Button>
        </form>
        <div className='a_label'>
          {counter === 0 ? (<><Button  color="ruby">Your OTP expired</Button></>) :
            (<a className='text-[16px]'> Your OTP expires in {formatTime(counter)}</a>)}
        </div>
        <br />
        <Button  asChild>
          <Link href="/customer" >
          I need more help
          </Link>
          </Button>
        </>
  );
}

export default Validate;
