import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common'
import { ApiModelProperty, ApiResponse } from '@nestjs/swagger'
import { sessionLogin } from './okta-client'
import { Response } from 'express'

export class LoginDto {
    @ApiModelProperty()
    email: string
    
    @ApiModelProperty()
    password: string
}

export class LoginResponseDto {
    @ApiModelProperty()
    sessionId: string
    
    @ApiModelProperty()
    userEmail: string
    
    @ApiModelProperty()
    userId: string
}

@Controller('login')
export default class AuthController {
    @Post()
    @ApiResponse({ type: LoginResponseDto, status: 201 })
    async login(@Body() data: LoginDto, @Res() res: Response): Promise<void> {
        const { email, password } = data
        try {
            const session = await sessionLogin({ email, password })
            res.cookie('sessionId', session.sessionId, { httpOnly: true })
            res.status(201).json(session)
        }
        catch (e) {
            console.log('login error', e)
            throw new UnauthorizedException('Invalid email or password')
        }
    }
}