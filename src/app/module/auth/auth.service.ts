import { auth } from "../../lib/auth";

const createCustomer = async (payload: ICreateCustomerPayload) => {
  const { name, email, password } = payload;
  try {
    const data = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    if (!data.user) {
      throw new Error("Failed to create customer");
    }
    return data.user;
  } catch (error) {
    console.log("Transaction error:", error);
    throw error;
  }
};

export const AuthService = {
  createCustomer,
};
