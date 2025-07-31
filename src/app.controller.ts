import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private conifgService: ConfigService
  ) { }

  @Get()
  getHello(): string  {
    // console.log(this.conifgService.get("dbconfig.dev.post"))
    return "mnb"
    // return this.conifgService.get("dbconfig.dev.post");
  }
}
