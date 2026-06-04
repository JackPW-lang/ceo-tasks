import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

@Controller()
export class AppController {
  @Post('auth') // single auth endpoint; no username or password needed, just the simple answer.
  login(@Body('answer') answer: string) {
    if(answer !== 'NOW!') { // hard-coded check, no database lookup required since this is a single user app
      throw new UnauthorizedException('Wrong answer.')
    }
    return { success: true };
  }
}
