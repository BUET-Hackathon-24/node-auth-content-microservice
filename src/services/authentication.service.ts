import { sign, verify } from "jsonwebtoken";
import RedisService from "./redis.service";

class AuthenticationService {
  async generateAccessToken(payload: any, refreshToken: string) {
    //console.log(payload);
    if (!payload) {
      throw new Error("Payload is required");
    }
    if (!(await this.verifyRefreshToken(refreshToken))) {
      throw new Error("Invalid refresh token");
    }
    const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "15m",
    });
    return accessToken;
  }
  async verifyAccessToken(token: string) {
    return verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  }
  async generateRefreshToken(payload: any) {
    if (!payload) {
      throw new Error("Payload is required");
    }
    const refreshToken = sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: "7d",
    });
    await RedisService.push(`refresh_token_${payload.id}`, refreshToken);
    return refreshToken;
  }
  async verifyRefreshToken(token: string) {
    let payload;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err, decoded) => {
        if (err) {
          console.log(err);
        }
        return decoded;
      });
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
    // if (!payload) {
    //   throw new Error("Invalid refresh token");
    // }
    // const storedTokens = await RedisService.lrange(
    //   `refresh_token_${payload.id}`,
    //   0,
    //   -1,
    // );

    // if (!storedTokens.includes(token)) {
    //   throw new Error("Refresh token not found");
    // }

    const refreshToken = token;
    return verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
  }
  async deleteRefreshToken(token: string) {
    const payload = verify(token, process.env.REFRESH_TOKEN_SECRET as string) as {
      id: string;
    };
    await RedisService.del(`refresh_token_${payload.id}`);
  }
  async deleteAllRefreshTokens(id: number) {
    await RedisService.del(`refresh_token_${id}`);
  }
}

export default new AuthenticationService();
