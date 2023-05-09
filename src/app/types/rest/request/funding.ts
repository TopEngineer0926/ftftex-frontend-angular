export interface FundsTransferRequest {
  ccy: string;
  amt: string;
  from: '6' | '18' | string;
  to: '6' | '18' | string;
  subAcct?: string;
  type?: '0' | '1' | '2' | '3' | '4';
  loanTrans?: boolean;
  clientId?: string;
  omitPosRisk?: string;
}

export interface WithdrawRequest {
  ccy: string;
  amt: string;
  dest: '3' | '4';
  toAddr: string;
  fee: string;
  chain?: string;
  areaCode?: string;
  clientId?: string;
}
