export async function loginWithGoogle() {
    console.log("API: Google login")
}

export async function loginWithMicrosoft() {
    console.log("API: Microsoft login")
}

export async function loginWithEmail(email: string) {
    //simulate API call
    console.log("API: email login", email)

    //example:
    // return await fetch("/api/auth/email", {...})
}