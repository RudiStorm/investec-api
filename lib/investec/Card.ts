import { Client } from "..";
import {
  getInvestecCardCountries,
  getInvestecCardCurrencies,
  getInvestecCardEnvironmentVariables,
  getInvestecCardExecutions,
  getInvestecCardMerchants,
  getInvestecCardPublishedCode,
  getInvestecCardSavedCode,
  postInvestecCardEnvironmentVariables,
  postInvestecCardPublishSavedCode,
  postInvestecCardSaveCode,
  postInvestecSimulateExecuteFunctionCode,
} from "../util/investec";
import {
  InvestecCard,
  InvestecCardCode,
  InvestecCardEnvironmentVariables,
  InvestecCardExecution,
  InvestecNameAndCode,
  InvestecSimulateExecutionInput,
  isResponseBad,
} from "../util/model";

export class Card implements InvestecCard {
  public static async getCountries(
    client: Client
  ): Promise<InvestecNameAndCode[]> {
    if (!client.token) {
      throw new Error("client is not set up");
    }
    const response = await getInvestecCardCountries(client.token.access_token);
    if (isResponseBad(response)) {
      throw new Error(`error getting countries: ${{ response }}`);
    }
    return response.data.result;
  }
  public static async getCurrencies(
    client: Client
  ): Promise<InvestecNameAndCode[]> {
    if (!client.token) {
      throw new Error("client is not set up");
    }
    const response = await getInvestecCardCurrencies(client.token.access_token);
    if (isResponseBad(response)) {
      throw new Error(`error getting countries: ${{ response }}`);
    }
    return response.data.result;
  }
  public static async getMerchants(
    client: Client
  ): Promise<InvestecNameAndCode[]> {
    if (!client.token) {
      throw new Error("client is not set up");
    }
    const response = await getInvestecCardMerchants(client.token.access_token);
    if (isResponseBad(response)) {
      throw new Error(`error getting countries: ${{ response }}`);
    }
    return response.data.result;
  }
  public CardKey: string;
  public CardNumber: string;
  public IsProgrammable: boolean;
  public Status: string;
  public CardTypeCode: string;
  public AccountNumber: string;
  public AccountId: string;
  constructor(private client: Client, card: InvestecCard) {
    this.CardKey = card.cardKey;
    this.CardNumber = card.cardNumber;
    this.IsProgrammable = card.isProgrammable;
    this.Status = card.status;
    this.CardTypeCode = card.cardTypeCode;
    this.AccountNumber = card.accountNumber;
    this.AccountId = card.accountId;
  }  

  public async getSavedCode(): Promise<InvestecCardCode> {
    if (!this.client.token) {
      throw new Error("client is not set up");
    }
    const savedCode = await getInvestecCardSavedCode(
      this.client.token.access_token,
      this.CardKey
    );
    if (isResponseBad(savedCode)) {
      throw new Error(
        `not ok response while getting saved code: ${{
          cardKey: this.CardKey,
          response: savedCode,
        }}`
      );
    }
    return savedCode.data.result;
  }

  public async getPublishedCode(): Promise<InvestecCardCode> {
    if (!this.client.token) {
      throw new Error("client is not set up");
    }
    const publishedCode = await getInvestecCardPublishedCode(
      this.client.token.access_token,
      this.CardKey
    );
    if (isResponseBad(publishedCode)) {
      throw new Error(
        `not ok response while getting published code: ${{
          cardKey: this.CardKey,
          response: publishedCode,
        }}`
      );
    }
    return publishedCode.data.result;
  }

  public async updateSavedCode(code: string): Promise<InvestecCardCode> {
    if (!this.client.token) {
      throw new Error("client is not set up");
    }

    const savedCode = await postInvestecCardSaveCode(
      this.client.token.access_token,
      this.CardKey,
      code
    );
    if (isResponseBad(savedCode)) {
      throw new Error(
        `not ok response while updating saved code: ${{
          cardKey: this.CardKey,
          response: savedCode,
        }}`
      );
    }
    return savedCode.data.result;
  }

  public async publishSavedCode(codeId: string): Promise<InvestecCardCode> {
    if (!this.client.token) {
      throw new Error("client is not set up");
    }

    const publishedCode = await postInvestecCardPublishSavedCode(
      this.client.token.access_token,
      this.CardKey,
      codeId
    );
    if (isResponseBad(publishedCode)) {
      throw new Error(
        `not ok response while updating saved code: ${{
          cardKey: this.CardKey,
          response: publishedCode,
        }}`
      );
    }
    return publishedCode.data.result;
  }

  public async simulateFunctionExecution(
    opts: InvestecSimulateExecutionInput
  ): Promise<InvestecCardExecution[]> {
    if (!this.client.token) {
      throw new Error("client is not set up");
    }

    const execution = await postInvestecSimulateExecuteFunctionCode(
      this.client.token.access_token,
      this.CardKey,
      opts
    );
    if (isResponseBad(execution)) {
      throw new Error(
        `not ok response while updating saved code: ${{
          cardKey: this.CardKey,
          response: execution,
        }}`
      );
    }
    return execution.data.result;
  }

  public async getExecutions(): Promise<InvestecCardExecution[]> {
    if (!this.client.token) {
      throw new Error("client is not set up");
    }

    const execution = await getInvestecCardExecutions(
      this.client.token.access_token,
      this.CardKey
    );
    if (isResponseBad(execution)) {
      throw new Error(
        `not ok response while updating saved code: ${{
          cardKey: this.CardKey,
          response: execution,
        }}`
      );
    }
    return execution.data.result;
  }

  public async getEnvironmentVariables(): Promise<InvestecCardEnvironmentVariables> {
    if (!this.client.token) {
      throw new Error("client is not set up");
    }

    const execution = await getInvestecCardEnvironmentVariables(
      this.client.token.access_token,
      this.CardKey
    );
    if (isResponseBad(execution)) {
      throw new Error(
        `not ok response while updating saved code: ${{
          cardKey: this.CardKey,
          response: execution,
        }}`
      );
    }
    return execution.data.result;
  }

  public async updateEnvironmentVariables(variables: {
    [key in string]: string | number | boolean | Object;
  }): Promise<InvestecCardEnvironmentVariables> {
    if (!this.client.token) {
      throw new Error("client is not set up");
    }

    const execution = await postInvestecCardEnvironmentVariables(
      this.client.token.access_token,
      this.CardKey,
      variables
    );
    if (isResponseBad(execution)) {
      throw new Error(
        `not ok response while updating saved code: ${{
          cardKey: this.CardKey,
          response: execution,
        }}`
      );
    }
    return execution.data.result;
  }
}
