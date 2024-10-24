import { Redis } from "ioredis";
class RedisService {
  private redis: Redis;
  private otpExpirationTime = 60 * 5;
  private sessionExpirationTime = 60 * 60 * 24 * 30;
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL as string);
  }
  async set(key: string, value: string) {
    await this.redis.set(key, value, "EX", this.otpExpirationTime);
  }
  async get(key: string) {
    return await this.redis.get(key);
  }
  async push(key: string, value: string) {
    await this.redis.lpush(key, value, "EX", this.sessionExpirationTime);
  }
  async pop(key: string) {
    return await this.redis.lpop(key);
  }
  async lrange(key: string, start: number, end: number) {
    return await this.redis.lrange(key, start, end);
  }
  async ltrim(key: string, start: number, end: number) {
    await this.redis.ltrim(key, start, end);
  }
  async del(key: string) {
    await this.redis.del(key);
  }
  async expire(key: string, seconds: number) {
    await this.redis.expire(key, seconds);
  }
}

export default new RedisService();
