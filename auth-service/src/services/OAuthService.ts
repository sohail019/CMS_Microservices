import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { OAUTH_PROVIDERS } from "../config";
import { UserModel } from "../models/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: OAUTH_PROVIDERS.google.clientId,
      clientSecret: OAUTH_PROVIDERS.google.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Find or create user logic
      let user = await UserModel.findOne({ email: profile.emails?.[0].value });
      if (!user) {
        user = await UserModel.create({
          email: profile.emails?.[0].value,
          passwordHash: "",
          roles: ["User"],
          permissions: [],
          isEmailVerified: true,
        });
      }
      return done(null, user);
    }
  )
);

export const OAuthService = passport;
