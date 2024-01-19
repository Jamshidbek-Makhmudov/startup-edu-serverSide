import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/common/decorators/auth.decorator';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }
  
   
  @ApiOperation({ summary: 'create' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(201)
  @Post('create')
  @Auth('ADMIN')
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }
  
  @ApiOperation({ summary: 'find-all' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('find-all')
  findAll() {
    return this.booksService.findAll();
  }
  
  /**coming soon */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  
  @ApiOperation({ summary: 'update' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Patch('update/:id')
  @Auth('ADMIN')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }
  
  @ApiOperation({ summary: 'delete' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Delete('delete/:id')
  @Auth('ADMIN')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}