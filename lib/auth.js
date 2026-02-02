import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import ConnectDB from "./config/db"
import AdminModel from "./models/AdminModel"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                await ConnectDB();
                const user = await AdminModel.findOne({ email: credentials.email });

                if (user && (await bcrypt.compare(credentials.password, user.password))) {
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.image
                    };
                }

                return null;
            },
        }),
    ],
})


