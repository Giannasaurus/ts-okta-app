import { Controller, Get } from '@nestjs/common'
import { ApiModelProperty, ApiResponse } from '@nestjs/swagger'

export class BlogPost {
    @ApiModelProperty()
    id: number
    
    @ApiModelProperty()
    authorId: string
    
    @ApiModelProperty()
    title: string
    
    @ApiModelProperty()
    content: string
}

export const blogPosts = [{
    id: 1,
    authorId: 'xxx',
    title: 'Build a NodeJS App with TypeScript',
    content: 'What\'s wrong with JavaScript?'
},
{
    id: 2,
    authorId: 'yyy',
    title: 'Don\'t build a NodeJS App with TypeScript',
    content: 'What\'s wrong with TypeScript?'
}]

@Controller('blog-posts')
export default class BlogPostController {
    @Get()
    @ApiResponse({ type: BlogPost, status: 200, isArray: true })
    findAll(): Array<BlogPost> {
        return blogPosts
    }
}