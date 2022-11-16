
export async function ResendOtp(e, restartTimer) {
    try {
        e.preventDefault()
        console.log("Resending Otp...");

        // after re-sending otp set timer back increase by 5 more sec
        restartTimer( current => current + 5 ) 

    } catch (error) {
        
    }
}
