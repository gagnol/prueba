import dbConnect from "@/lib/db-connect";
import User from "@/lib/user-model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {

        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const userFound = await User.findOne({
          email: credentials.email,
        }).select("+password");

        if (!userFound) throw new Error("Invalid credentials");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!passwordMatch) throw new Error("Invalid credentials");

        return Promise.resolve(userFound); // Devuelve la promesa
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user,trigger,session }: { token: any; user?: any ;trigger?:any;session?:any}) {
      if(trigger==="update"){
          return {...token ,...session.user}
      }
      if (user) {
        token._id = user._id,
        token.name = user.name;
        token.image = user.image;
        token.isAdmin = user.isAdmin;
        token.address = user.address;
        token.city = user.city;
        token.postal = user.postal;
        token.country = user.country

      };

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user._id = token._id,
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.isAdmin = token.isAdmin;
        session.user.address = token.address;
        session.user.city = token.city;
        session.user.postal = token.postal;
        session.user.country = token.country;
      }
      return session;

    },
  },
});


export { handler as GET, handler as POST }
