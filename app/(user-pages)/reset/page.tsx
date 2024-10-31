"use client"
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Reset() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { userInfo } = useSelector((state: any) => state.next);
console.log(userInfo)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      await axios.post("/api/auth/reset", {
        email: userInfo.email,
        password: formData.get("password"),
        cpassword: formData.get("cpassword"),
      });

      router.push("/signin");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <div className="bg-red-500  p-2 mb-2">{error}</div>}
        <h1 className="text-[21px] font-bold pb-5">Create a new password</h1>
        <div className="a_label">We will ask for this password whenever you Sign-In.</div>
        <label htmlFor="password" className="text-slate-300">Password</label>
        <Input
        type="password" 
        placeholder="Password" 
        autoComplete="off" 
        name="password"
         />
        <label htmlFor="cpassword" className="text-slate-300">Re-enter password</label>
        <Input
        type="password" 
        placeholder="Password" autoComplete="off" 
        name="cpassword"
         />
        <Button type="submit" style={{ width: "100%", marginTop: "10px" }}>
          Reset password
        </Button>
      </form>
      <br />
      <h4>Secure password tips:</h4>
      <div className="a_label">
        <ul>
          <li>Use at least 8 characters, a combination of numbers and letters is best.</li>
          <li>Do not use the same password you have used with us previously.</li>
          <li>Do not use dictionary words, your name, e-mail address, mobile phone number, or other personal information that can be easily obtained.</li>
          <li>Do not use the same password for multiple online accounts.</li>
        </ul>
      </div>
    </>
  );
}

export default Reset;
