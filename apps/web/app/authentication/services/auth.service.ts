export async function loginWithGoogle() {
    try {
        console.log("Logging in with Google...");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { success: true }
    } catch (error) {
        throw new Error("Failed to login with Google")
    }
}

export async function loginWithMicrosoft() {
    try {
        console.log("Logging in with Microsoft...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { success: true }
    } catch (error) {
        throw new Error("Failed to login with Microsoft")
    }
}

export async function loginWithEmail(email: string) {
    try {
        console.log("Logging in with Email:", email);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { success: true }
    } catch (error) {
        throw new Error("Failed to login with Email")
    }
}