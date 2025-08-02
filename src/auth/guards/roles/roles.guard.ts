import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/types/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true;
    }


    const user = context.switchToHttp().getRequest().user;
    console.log(requiredRoles)
    const hasRequiredRoles = requiredRoles.some((role) => user.role === role);
    return hasRequiredRoles;

    // return true;
  }
}
