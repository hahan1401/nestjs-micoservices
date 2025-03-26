export class LoginResponseDto {
  constructor(
    public accessToken: string,
    public refreshToen: string,
  ) {}
}
