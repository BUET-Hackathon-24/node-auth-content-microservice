import supabase from '../../utils/supabase.client';
import { Provider, UserMetadata } from '@supabase/supabase-js';
import UserService from './user.service';
import AuthenticationService from './authentication.service';
class SupabaseAuthService {
  userService = new UserService();
  
  handleSocialSignIn = async (provider: string) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        skipBrowserRedirect: false,
        redirectTo: process.env.REDIRECT_URL,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  };
  exchangeToken = async (access_token: string, refresh_token: string) => {
    const user = await supabase.auth.getUser(access_token);
    console.log(user);
    console.log(user.data?.user?.user_metadata);
    const { email ,name,picture } = user.data?.user?.user_metadata as UserMetadata;
    const userData = await this.userService.createUserFromSocial(name,email,picture);
    if (user.error) {
      throw user.error;
    } else {
      const refreshToken = await AuthenticationService.generateRefreshToken(userData);
      const accessToken = await AuthenticationService.generateAccessToken(userData,refreshToken);
      return {refreshToken,accessToken};
    } 
  };
}

export default SupabaseAuthService;
