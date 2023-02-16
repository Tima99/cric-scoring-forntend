import { ResendOtpRequest } from "../api/request";

export async function ResendOtp(e, restartTimer, to, setMsg, isResetPwd) {
    try {
        e.preventDefault()
        const textEle = e.target
        textEle && (textEle.innerText = 'Sending...')
        textEle && textEle.parentElement.classList.add('disable-link')
        textEle && textEle.parentElement.classList.remove('active-link')

        const res = await ResendOtpRequest(to, isResetPwd)
        // console.log(res);

        setMsg('$'+res.data)

        // after re-sending otp set timer back increase by 5 more sec
        restartTimer( current => { 
            textEle && (textEle.innerText = 'Resend Otp')
            return current + 5 
        } ) 
    } catch (error) {
        console.log(error);
        setMsg(error?.response?.data || error)
    }
}
