import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor () {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'O_MEU_PROFESSOR_BRYAM_E_UM_BABACA',
        })
    }

private static cookieExtractor(req: Request): string | null {
    if(req.cookies && req.cookies.access_token) {
        return req.cookies.access_token;
    }
    return null;
}


    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email, nome: payload.nome };
    }

}