import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth.jwtpayload";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy ,"jwt") {

    constructor( @Inject(jwtConfig.KEY)
         private jwtconfigration: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtconfigration.secret!,
            ignoreExpiration: false,
        })
    }
    validate(payload: AuthJwtPayload) {
        return { id: payload.sub }
    }
}