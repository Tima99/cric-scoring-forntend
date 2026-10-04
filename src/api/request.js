import axios from "axios"
// API routes are mounted under /api; tolerate an env value with or without it
const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "")
const req = axios.create({
    baseURL: apiBase.endsWith("/api") ? apiBase : `${apiBase}/api`,
    timeout: 18000,
    withCredentials: true,
});

export const Register = async (data) => {
    try {
        const res = await req.post('/register', data )
        return res
    } catch (error) {
        return Promise.reject(error)
    }
}

export const Login = async (data) => {
    try {
        const res = await req.post('/login', data )
        return res
    } catch (error) {
        return Promise.reject(error)
    }
}

export const VerifyOtp = async ( data ) => {
    try {
        // {email, otp}
        const res = await req.post('/verify/otp', data )
        return res
    } catch (error) {
        return Promise.reject(error)
    }
}

export const ResendOtpRequest = async ( email , isResetPwd) => {
    try {
        // email
        const res = await req.get(`/resend/otp/${email}/${isResetPwd}`)
        return res
    } catch (error) {
        return Promise.reject(error)
    }
}


export const ChangeEmail = async ( data ) => {
    try {
        // { email, ["new-email"]: newEmail }
        const res = await req.post('/update/email', data)
        return res
    } catch (error) {
        return Promise.reject(error)
    }
}


export const UserAuthentic = async ( ) => {
    try {
        // { email, ["new-email"]: newEmail }
        const res = await req.get('/auth')
        // /auth responds with the user's email; anything else (e.g. "Not valid route.") means not authenticated
        const d = res.data
        const ok = d && (typeof d === 'object' || (typeof d === 'string' && d.includes('@')))
        if (!ok) return Promise.reject(new Error('Unauthenticated'))
        return res.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export const CreatePlayer= async ( data ) => {
    try {
        // { name, location, gender, role, logo:optional }
        const res = await req.post('/createPlayer', data)
        return res
    } catch (error) {
        return Promise.reject(error)
    }
}

export const EditPlayer= async ( data ) => {
    try {
        // { name, location, gender, role, logo:optional }
        const res = await req.post('/editPlayer', data)
        return res
    } catch (error) {
        return Promise.reject(error)
    }
}
export const CreateTeamRequest = async ( data ) => {
    try {
        // { name, location, gender, role, logo:optional }
        const res = await req.post('/createTeam', data)
        return res
    } catch (error) {
        return Promise.reject(error)
    }
}


export default req