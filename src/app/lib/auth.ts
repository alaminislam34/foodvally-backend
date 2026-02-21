import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { UserRole, UserStatus } from "../../generated/enums";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.CUSTOMER,
        required: true,
      },
      status: {
        type: "string",
        defaultValue: UserStatus.ACTIVE,
        required: true,
      },
      isDeleted: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      needPasswordReset: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
    },
  },
});
