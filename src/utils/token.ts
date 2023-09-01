import { JwtService } from '@nestjs/jwt';

export function generateTokens(
  jwtService: JwtService,
  username: string,
  password: string,
) {
  const users = [
    { username: 'admin', password: 'admin' },
    { username: 'user', password: 'user' },
  ];

  const user = users.find(
    (item) => item.username === username && item.password === password,
  );

  if (!user) {
    return null;
  }

  const token = jwtService.sign(
    {
      username: user.username,
      password: user.password,
    },
    {
      expiresIn: '0.5h',
    },
  );

  const refreshToken = jwtService.sign(
    {
      username: user.username,
      password: user.password,
    },
    {
      expiresIn: '7d',
    },
  );

  return { token, refreshToken };
}
