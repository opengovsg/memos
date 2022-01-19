import { Injectable, NotFoundException } from '@nestjs/common'
import { Memo } from 'database/entities'
import { pick } from 'lodash'
import { renderTemplate } from 'templates/templates.util'
import { Connection } from 'typeorm'
import { GetMemoResponseDto } from './dto/get-memo.dto'

@Injectable()
export class MemosService {
  constructor(private connection: Connection) {}

  async createMemo(): Promise<void> {
    return
  }
  async voidMemos(): Promise<void> {
    return
  }
  async uploadMemos(): Promise<void> {
    return
  }
  async uploadMemosComplete(): Promise<void> {
    return
  }
  async listMemosForUser(): Promise<void> {
    return
  }

  // Retrieves an existing memo based on slug
  async getMemo(slug: string): Promise<GetMemoResponseDto> {
    const memo = await this.connection.manager.findOne(Memo, {
      where: {
        slug,
      },
      relations: ['issuer', 'templateVersion'],
    })
    if (!memo) {
      throw new NotFoundException()
    }

    // Interpolate parameters
    const {
      templateVersion: { body },
      params,
    } = memo
    const renderedBody = body.map((block) => {
      // If data is not a string, return untouched
      if (typeof block.data !== 'string') return block
      return {
        ...block,
        data: renderTemplate(block.data, { ...params, uin: memo.uin }),
      }
    })

    return {
      ...pick(memo, [
        'id',
        'issuer',
        'uin',
        'uinType',
        'expiresAt',
        'isViewed',
        'isVoid',
        'voidReason',
      ]),
      body: renderedBody,
      slug,
    }
  }
}
