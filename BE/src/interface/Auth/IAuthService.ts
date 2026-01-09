export interface IAuthService {
  verifyUser(userId: string): Promise<void>;
}
