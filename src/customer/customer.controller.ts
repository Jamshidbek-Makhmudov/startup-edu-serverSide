import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from 'src/customer/customer.service';
import { Auth } from '../auth/common/decorators/auth.decorator';
import { User } from '../user/decorators/user.decorator';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
 constructor(private readonly customerService: CustomerService) { }
  
  @ApiOperation({ summary: "get user's datas" })
  @ApiResponse({ status: 200, type: Promise<String> })
  @HttpCode(200)
  @Get('saved-cards')
  @Auth('USER')
  getSavedCustomerCard(@User('customerId') customerId: string) {
    return this.customerService.saveCustomerCard(customerId)
   }


}
