export async function loginWithGoogle() {
    try {
        console.log("Logging in with Google...");

        return { success: true }
    } catch (error) {
        throw new Error("Failed to login with Google")
    }
}

export async function loginWithMicrosoft() {
    try {
        console.log("Logging in with Microsoft...");
        return { success: true }
    } catch (error) {
        throw new Error("Failed to login with Microsoft")
    }
}

export async function loginWithEmail(email: string) {
    try {
        console.log("Logging in with Email:", email);

        return { success: true }
    } catch (error) {
        throw new Error("Failed to login with Email")
    }
}