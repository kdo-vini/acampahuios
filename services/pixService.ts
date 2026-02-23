import { PIX_KEY, PIX_MERCHANT_NAME, PIX_MERCHANT_CITY } from '../constants';

// Helper to format string with length prefix
const formatField = (id: string, value: string): string => {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
};

// CRC16 Calculation (CCITT-FALSE)
const calculateCRC16 = (payload: string): string => {
  let crc = 0xFFFF;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc = crc << 1;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
};

/**
 * Generates a PIX Static payload string (Copy and Paste code)
 */
export const generatePixPayload = (amount: number): string => {
  const amountStr = amount.toFixed(2);

  // 00 - Payload Format Indicator
  const p00 = formatField('00', '01');

  // 26 - Merchant Account Information
  const gui = formatField('00', 'br.gov.bcb.pix');
  const key = formatField('01', PIX_KEY);
  const p26 = formatField('26', gui + key);

  // 52 - Merchant Category Code
  const p52 = formatField('52', '0000');

  // 53 - Transaction Currency (986 = BRL)
  const p53 = formatField('53', '986');

  // 54 - Transaction Amount
  const p54 = formatField('54', amountStr);

  // 58 - Country Code
  const p58 = formatField('58', 'BR');

  // 59 - Merchant Name
  // The name length must be up to 25 chars max
  const p59 = formatField('59', PIX_MERCHANT_NAME.substring(0, 25));

  // 60 - Merchant City
  const p60 = formatField('60', PIX_MERCHANT_CITY.substring(0, 15));

  // 62 - Additional Data Field (TxID)
  // Must be *** for static PIX using random keys (EVP) to avoid rejection
  const p05 = formatField('05', '***');
  const p62 = formatField('62', p05);

  // Payload without CRC
  const payload = `${p00}${p26}${p52}${p53}${p54}${p58}${p59}${p60}${p62}6304`;

  // Calculate CRC
  const crc = calculateCRC16(payload);

  return `${payload}${crc}`;
};