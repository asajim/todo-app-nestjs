import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    let responseBody = '';

    /**
     * A helper function to get the response body from a given Response object.
     * https://stackoverflow.com/a/50161321
     * @param {Response} response The Response object to get the response body from.
     */
    function updateResponseToEnableGettingBody(response: Response) {
      const oldWrite = response.write;
      const oldEnd = response.end;

      const chunks = [];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      response.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(response, restArgs);
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      response.end = (...restArgs) => {
        if (restArgs[0]) {
          chunks.push(Buffer.from(restArgs[0]));
        }
        responseBody = Buffer.concat(chunks).toString('utf8');

        oldEnd.apply(response, restArgs);
      };
    }

    const { ip, method, originalUrl, body, headers } = request;
    const userAgent = request.get('user-agent') || '';

    updateResponseToEnableGettingBody(response);

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length') ?? 0;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} - Headers: ${JSON.stringify(
          headers,
        )} - Body: ${JSON.stringify(body)} - Response: ${responseBody}`,
      );
    });

    next();
  }
}
