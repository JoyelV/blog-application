export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    providers: [],
    callbacks: {
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.image = user.image; // Store image in token
            }
            if (trigger === 'update' && session?.user) {
                token.name = session.user.name;
                token.image = session.user.image;
            }
            return token;
        },
        session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.image = token.image; // Pass image to session
            }
            return session;
        },
    },
}
