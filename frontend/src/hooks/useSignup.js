import { useState } from 'react'
import toast from 'react-hot-toast'

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async({fullName, username, password, confirmPassword, gender}) => {
    const success = handleInputErrors({fullName, username, password, confirmPassword, gender})


    setLoading(true)
    if(!success)
        return;
    try {

        // FETCH QUERY post method
        const res = await fetch("/api/v1/auth/signup", {
            // POST METHOD
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullName, username, password, confirmPassword, gender})
        })

        const data = await res.json();
        console.log(data);
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }

  }

  return {loading, signup}

}

export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all fields')
        return false;
    }

    if(password!==confirmPassword){
        toast.error('Passwords don\'t match');
        return false;
    }

    if(password.length < 6){
        toast.error('Password must be less than 6 characters');
        return false;
    }

    return true;
}