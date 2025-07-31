import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth.jwtpayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { access } from 'fs';

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

    login(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload , this.refreshJwtConfigration);
        return {
            id :userId , 
            accessToken, 
            refreshToken
        }
    }

}
