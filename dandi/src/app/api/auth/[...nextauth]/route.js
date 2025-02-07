import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from '@/lib/supabase';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Sprawdź czy użytkownik już istnieje
        const { data: existingUser } = await supabase
          .from('users')
          .select()
          .eq('email', user.email)
          .single();

        if (!existingUser) {
          // Dodaj nowego użytkownika do Supabase
          const { data, error } = await supabase
            .from('users')
            .insert([
              {
                email: user.email,
                name: user.name,
                image: user.image,
                auth_provider: 'google',
                last_login: new Date().toISOString()
              }
            ]);

          if (error) {
            console.error('Error creating user:', error);
            return false;
          }
        } else {
          // Aktualizuj datę ostatniego logowania
          await supabase
            .from('users')
            .update({ last_login: new Date().toISOString() })
            .eq('email', user.email);
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 