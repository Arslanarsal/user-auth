import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth.jwtpayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { access } from 'fs';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshJwtConfigration: ConfigType<typeof refreshJwtConfig>
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        const ispasswordMatch = await bcrypt.compare(password, user.password);
        if (!ispasswordMatch) {
            throw new UnauthorizedException("invalid credentials")
        }
        return user;
    }

    async login(userId: number) {
        // const payload: AuthJwtPayload = { sub: userId };
        // const accessToken = this.jwtService.sign(payload);
        // const refreshToken = this.jwtService.sign(payload, this.refreshJwtConfigration);
        const { accessToken, refreshToken } = await this.generateToken(userId);

        const hashedRefreshToken = await argon.hash(refreshToken);
        await this.userService.updateRefreshToken(userId, hashedRefreshToken);

        return {
            id: userId,
            accessToken,
            refreshToken
        }
    }

    async generateToken(userId: number) {

        const payload: AuthJwtPayload = { sub: userId }
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshJwtConfigration)
        ])
        return {
            accessToken, refreshToken
        }
    }

    async refresh(userId: number) {
        const { accessToken, refreshToken } = await this.generateToken(userId);

        const hashedRefreshToken = await argon.hash(refreshToken);
        await this.userService.updateRefreshToken(userId, hashedRefreshToken);

        return {
            id: userId,
            accessToken,
            refreshToken
        }
    }


    async validRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.hashRefreshToken) {
            throw new UnauthorizedException("invalid refresh token")
        }

        const refreeshTokenMatch = await argon.verify(user.hashRefreshToken, refreshToken);
        if (!refreeshTokenMatch) {
            throw new UnauthorizedException("invalid refresh token")
        }

        return user;
    }


    async logout(userId: number) {
        return await this.userService.updateRefreshToken(userId, "");
    }

}
