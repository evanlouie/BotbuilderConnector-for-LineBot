import { Message } from "botframework-directlinejs";
import { AbstractConverter } from "./AbstractConverter";
import { AudioConverter } from "./AudioConverter";
import { HeroCard } from "./HeroCard";
import { VideoConverter } from "./VideoConverter";

export class DirectLineConverter {
  public static convertDirectLineToLine(dlMessage: Message): Line.Message[] {
    const lineMessages: Line.Message[] = [];
    if (dlMessage.text) {
      lineMessages.push({
        text: dlMessage.text,
        type: "text"
      });
    }

    // Iterate over all possible attachments and add them to message array
    for (const attachment of dlMessage.attachments || []) {
      let converter: AbstractConverter | null = null;
      switch (attachment.contentType) {
        case "application/vnd.microsoft.card.video":
          converter = new VideoConverter();
          break;
        case "application/vnd.microsoft.card.audio":
          converter = new AudioConverter();
          break;
        case "application/vnd.microsoft.card.hero":
          converter = new HeroCard();
          break;
        default:
          break;
      }

      if (converter) {
        const message = converter.DirectLineToLine(attachment);
        lineMessages.push(message);
      } else {
        lineMessages.push({
          text: `Unsupported DirectLine type: ${attachment.contentType}`,
          type: "text"
        });
      }
    }

    console.log('LINE MESSAGES', lineMessages);
    return lineMessages;
  }
}
