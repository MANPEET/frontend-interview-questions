import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({length, onOtpSubmit}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""))
    const inputRefs = useRef([])

    useEffect(() => {
        if(inputRefs.current[0]){
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (index,e) => {
        const value = e.target?.value

        if(isNaN(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.substring(value.length - 1)

        setOtp(newOtp)
        const combinedOtp = newOtp.join("")

        if(combinedOtp.length === length){
            onOtpSubmit(combinedOtp)
        }

        if(value && index < length - 1 && inputRefs.current[index + 1]){
            inputRefs.current[index + 1].focus()
        }
    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1,1)

        if(index > 0 && !otp[index - 1]){
            inputRefs.current[otp.indexOf("")].focus()
        }
    }

    const handleKey = (index, e) => {
        if(e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]){
            inputRefs.current[index - 1].focus()
        }
    }

    console.log(inputRefs)
    
    return (
        <div className='flex items-center gap-6'>
            {otp.map((val, index) => (
                <input 
                    key={index}
                    name='otp-field'
                    ref={(input) => (inputRefs.current[index] = input)}
                    type='text'
                    className='aspect-square w-15 h-15 border text-black text-xl text-center'
                    value={val}
                    onChange={(e) => handleChange(index,e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKey(index,e)}
                />
            ))}
        </div>
    )
}

export default OtpInput
