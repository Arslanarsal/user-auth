import { SetMetadata } from "@nestjs/common";
import { Role } from "../types/enums/role.enum";
import { Expose } from "class-transformer";


export const ROLE_KEY = "roles"
export const Roles = (...roles: [Role, ...Role[]]) => SetMetadata(ROLE_KEY, roles)