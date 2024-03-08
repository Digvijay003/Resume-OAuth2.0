import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";


const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            authorization: {
                params: { scope: 'openid profile email' },
              },
              issuer: 'https://www.linkedin.com',
              jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
              profile(profile, tokens) {
                const defaultImage =
                  'https://cdn-icons-png.flaticon.com/512/174/174857.png';
                return {
                  id: profile.sub,
                  name: profile.name,
                  email: profile.email,
                  image: profile.picture ?? defaultImage,
                };
              }
            
          })
        
    ],
    callbacks:{
      async jwt({ token, account, profile }) {
     
        // Persist the OAuth access_token and or the user id to the token right after signin
       if(account){
          token.accessToken = account?.access_token
          token.id = profile?.id
       }
        return token
      },
      async session({ session, token, user }) {
     
        // Send properties to the client, like an access_token and user id from a provider.
      
          session.accessToken = token?.accessToken
          session.user.id = token?.id
  
        return session
      }
    }

})



export { handler as GET, handler as POST }