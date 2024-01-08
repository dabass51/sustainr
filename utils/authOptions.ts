import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from "@/lib/prisma";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer"

function text({ url, host }: { url: string, host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}

function html(params: { url: string, host: string }) {
  const { url, host } = params

  const escapedHost = host.replace(/\./g, "&#8203;.")

  return `
    <body style="background: #0c0b0a;">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: #0c0b0a; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center">
            <a href="https://www.bikefittr.com/"><img alt="bikefittr.com" style="color:transparent;width:100px;height:auto" src="https://www.bikefittr.com/logo-dark.png"></a>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: white;">
            You're just one click away from accessing your account at ${escapedHost}! To ensure your convenience and security, we've generated a unique login link just for you.
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: white;">
            Your Magic Login Link to: <strong>${escapedHost}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="#facb14"><a href="${url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #0c0b0a; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid #facb14; display: inline-block; font-weight: bold;">Sign
                    in</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: white;">
            This link is valid for the next 24 hours and can only be used once. If you didn't request this link or if it wasn't you, please ignore this email or contact us for support.
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: white;">
            <strong>Why a Magic Link?</strong><br>
            Magic links are a secure and user-friendly way to access your account without the hassle of remembering passwords. They are encrypted and uniquely generated each time for your security.
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: white;">
            <strong>Questions or Concerns?</strong><br>
            If you have any questions or need assistance, feel free to reach out to our support team at <a target="_blank" href="mailto:contact@bikefittr.com">contact@bikefittr.com</a>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: white;">
            <strong>Note:</strong><br>
            For your safety, never share your magic link with anyone.
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: white;">
            Thank you for choosing ${escapedHost}!
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: white;">
            Warm regards,<br>
            The ${escapedHost} Team
          </td>
        </tr>
      </table>
    </body>
`
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.CLIENT_SECRET,
  debug: false,
  /*session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },*/
  providers: [
    EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
        async sendVerificationRequest({
          identifier: email,
          url,
          provider: { server, from },
       }) {
          const { host } = new URL(url);
          const transport = createTransport(server);
          await transport.sendMail({
             to: email,
             from,
             subject: `Sign in to ${host}`,
             text: text({ url, host }),
             html: html({ url, host }),
          });
       },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request', // (used for check email message)
    /*signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    */
  },
  callbacks: {
    async session({ session, user }) {
      session!.user!.id = user.id;
      return session;
    },
  },
};

