import { AbstractConverter } from "./AbstractConverter";
import { Activity as DirectLineActivity, CardImage, Attachment } from "botframework-directlinejs";

export class HeroCard implements AbstractConverter {
  public DirectLineToLine(attachment: Attachment): Line.Message {
    const content = attachment.content;
    const lineButtons = [];
    let image: CardImage;

    if (content.buttons) {
      for (const button of content.buttons) {
        lineButtons.push({
          label: button.title,
          text: button.value,
          type: "message"
        });
      }
    }

    if (content.images) {
      image = content.images[0] as CardImage;
    }

    const lineMessage: Line.Message = {
      altText: content.text || "test",
      template: {
        text: content.text ? content.text : "test",
        title: content.title ? content.title : "test",
        type: "buttons"
      },
      type: "template"
    };

    if (image) {
      lineMessage.template.thumbnailImageUrl = image.url;
    }

    if (content.buttons) {
      lineMessage.template.actions = lineButtons;
    }

    return lineMessage;
  }
}
