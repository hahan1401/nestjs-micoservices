import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('create')
  createPayment(
    @Query('amount') amount: number,
    @Query('orderId') orderId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const clientIp = req.ip || '127.0.0.1';
    const paymentUrl = this.paymentService.createPaymentUrl(
      orderId,
      amount,
      clientIp,
    );
    return res.redirect(paymentUrl);
  }

  @Get('callback')
  handleCallback(@Query() query: any, @Res() res: Response) {
    if (this.paymentService.verifyPayment(query)) {
      if (query['vnp_ResponseCode'] === '00') {
        return res.send('Thanh toán thành công');
      }
      return res.send('Thanh toán thất bại');
    }
    return res.send('Chữ ký không hợp lệ');
  }
}
