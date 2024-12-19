import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { signUpDto } from './dto/signup.dto'; // Adjust the import path as necessary

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: signUpDto): Promise<User> {
    // Check if a user with the given username already exists
    const userExists = await this.usersService.findOne(signUpDto.username);
    if (userExists) {
      throw new UnauthorizedException('Username already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    // Create a new user with the hashed password
    const newUser = await this.usersService.createUser({
      ...signUpDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
