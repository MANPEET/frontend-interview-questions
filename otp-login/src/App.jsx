import { useState } from "react"
import OtpInput from "./components/OtpInput"

function App() {
  const [phoneNumber, setPhoneNumber] = useState()
  const [showInput, setShowInput] = useState(false)

  const handleNumberSubmit = (e) => {
    e.preventDefault()
    const regex = /[^0-9]/g

    if(!phoneNumber || regex.test(phoneNumber) || phoneNumber.length < 10){
      alert("Please enter correct phone number")
      return
    }

    setShowInput(true)
  }

  const onOtpSubmit = (otp) => {
    console.log("OTP submitted", otp)
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">

      {/* Phone Input*/}
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl font-bold">Login with Phone</h1>

        <form className="flex gap-2" onSubmit={handleNumberSubmit}>
          {!showInput ? (
            <>
              <input 
                className="outline-none text-sm border rounded-md p-1" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number" 
              />
              <button type="submit" className="bg-black text-white text-md w-25 rounded-md text-center py-2 hover:transition-color hover:opacity-60 cursor-pointer">
                Submit
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-6 items-center">
              <span>OTP sent to {phoneNumber}</span>
              <OtpInput length={4} onOtpSubmit={(otp) => onOtpSubmit(otp)} />
            </div>
          )}
        </form>

      </div>
    </div>
  )
}

export default App
