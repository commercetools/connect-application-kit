import { createApplicationLogger } from '@commercetools-backend/loggers';
import { LEVEL } from 'triple-beam';

class AddSeverityFormatter {
  transform(info) {
    info['severity'] = info[LEVEL]?.toUpperCase();
    return info;
  }
}

export const logger = createApplicationLogger({
  formatters: [new AddSeverityFormatter()],
});
