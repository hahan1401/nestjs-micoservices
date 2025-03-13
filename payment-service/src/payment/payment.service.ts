import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'qs';
import { vnpayConfig } from 'src/configs/vnpay';

@Injectable()
export class PaymentService {
  createPaymentUrl(orderId: string, amount: number, clientIp: string): string {
    const vnp_Params: any = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: vnpayConfig.vnp_TmnCode,
      vnp_Amount: amount * 100, // Nhân 100 theo VNPAY yêu cầu
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toán đơn hàng ${orderId}`,
      vnp_OrderType: 'billpayment',
      vnp_Locale: 'vn',
      vnp_ReturnUrl: vnpayConfig.vnp_ReturnUrl,
      vnp_IpAddr: clientIp,
      vnp_CreateDate: new Date()
        .toISOString()
        .replace(/[-:T]/g, '')
        .slice(0, 14),
    };

    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((obj, key) => ({ ...obj, [key]: vnp_Params[key] }), {});

    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    return `${vnpayConfig.vnp_Url}?${qs.stringify({ ...sortedParams, vnp_SecureHash: signed }, { encode: false })}`;
  }

  verifyPayment(query: any): boolean {
    const vnp_Params = { ...query };
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const sortedParams = Object.keys(vnp_Params)
      .sort()
      .reduce((obj, key) => ({ ...obj, [key]: vnp_Params[key] }), {});

    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    return secureHash === signed;
  }
}
