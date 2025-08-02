import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth.jwtpayload";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import refreshJwtConfig from "../config/refresh-jwt.config";
import { Request } from "express";
import { AuthService } from "../auth.service";

@Injectable()
export class refreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt") {

    constructor(@Inject(refreshJwtConfig.KEY)
    private refreshJwtconfigration: ConfigType<typeof refreshJwtConfig>,
        private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtconfigration.secret!,
            ignoreExpiration: false,
            passReqToCallback: true,
        })
    }
    async validate(req: Request, payload: AuthJwtPayload) {
        const refreshToken = req.get("Authorization")?.replace("Bearer", "").trim();
        const userId = payload.sub;
        if (!userId || !refreshToken) {
            throw new UnauthorizedException("invalid refresh token")
        }
        const user = await this.authService.validRefreshToken(userId, refreshToken);
        return { id: payload.sub }
    }
}