import { Controller } from '@nestjs/common'
import { TemplatesService } from './templates.service'

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}
}
