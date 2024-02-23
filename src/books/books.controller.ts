import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/common/decorators/auth.decorator';
import { BookSearchOptions, BookSortOptions, SearchBookDto } from 'src/books/dto/filter-book.dto';
import { Request } from 'express';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

   
  @ApiOperation({ summary: 'create' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiBody({ type: CreateBookDto }) 
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

  /**coming soon start */
  /**filtering */
  @ApiOperation({ summary: 'filter' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @HttpCode(200)
  @Get('filter')
  async filterBook(@Req() req: Request) {
    const { search = '', sort, page = 1, limit = 10 } = req.query;
    // if (search !='') page = 1;

    const options: BookSearchOptions = {
      sort: sort as BookSortOptions,
      limit: Number(limit),
      page: Number(page)
    };
    const data = await this.booksService.filterFindBooks(
      search as string,
      options
    );
    const total = await this.booksService.filterCountBooks(search);

    return {
      data,
      total,
      page: Number(page),
      lastPage: Math.ceil(total / Number(limit))
    };

    }

  
  /**find one by id */
  @ApiOperation({ summary: 'find-one' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOneById(id);
  }
  /**find one by title or category */
  @ApiOperation({ summary: 'search-book' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiBody({ type: SearchBookDto }) 
  @HttpCode(200)
  @Post('search-book')
  searchBook(@Body() dto: SearchBookDto) {
    
    return this.booksService.searchBook(dto);
  }
  /**coming soon end */
  
  @ApiOperation({ summary: 'update' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  @HttpCode(200)
  @ApiBearerAuth() // Specify that Bearer token authentication is required for this controller
  @Patch('update/:id')
  @Auth('ADMIN')
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}', required: true })
  @ApiHeader({ name: 'Role', description: 'Admin', required: true }) // Specify the required role
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }
  
  @ApiOperation({ summary: 'delete' })
  @ApiResponse({ status: 200, type: Promise<String> })
  @ApiParam({ name: 'id', description: 'The ID of the book' })
  @HttpCode(200)
  @Delete('delete/:id')
  @Auth('ADMIN')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}