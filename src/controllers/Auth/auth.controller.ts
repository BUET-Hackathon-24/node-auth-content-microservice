import { Request, Response } from 'express';
import SupabaseAuthService from '../../services/Auth/supabase.auth.service';

class AuthController {
    supabaseAuthService = new SupabaseAuthService();

    callback = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log(req.url);
            console.log(req.body);
            res.send("Callback received");
        } catch (error) {
            console.error('Error in callback:', error);
            res.status(500).send("Internal Server Error");
        }
    }

    signInWithGoogle = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.supabaseAuthService.handleSocialSignIn('google');
            res.json(data);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            res.status(500).send("Internal Server Error");
        }
    }

    signInWithGithub = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.supabaseAuthService.handleSocialSignIn('github');
            res.json(data);
        } catch (error) {
            console.error('Error signing in with Github:', error);
            res.status(500).send("Internal Server Error");
        }
    }

    signInWithFacebook = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.supabaseAuthService.handleSocialSignIn('facebook');
            res.json(data);
        } catch (error) {
            console.error('Error signing in with Facebook:', error);
            res.status(500).send("Internal Server Error");
        }
    }

    exchangeToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const { access_token, refresh_token } = req.body;
            console.log(req.body);
            if (!access_token) {
                res.status(401).send("Unauthorized");
                return;
            }
            const data = await this.supabaseAuthService.exchangeToken(access_token, refresh_token);
            res.json(data);
        } catch (error) {
            console.error('Error exchanging token:', error);
            res.status(500).send("Internal Server Error");
        }
    }
}

export default AuthController;
