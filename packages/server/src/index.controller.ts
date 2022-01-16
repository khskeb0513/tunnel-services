import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class IndexController {
  @Get()
  @Render('Index')
  index() {
    return;
  }
}
