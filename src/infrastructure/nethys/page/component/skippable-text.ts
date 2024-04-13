import { NethysComponent } from "./pattern";

export const SkippableTexts = [
    /Dwarves are a short, stocky people who are often stubborn, fierce, and devoted\./,
    /Elves are a tall, long-lived people with a strong tradition of art and magic\./,
    /Gnomes are short and hardy folk, with an unquenchable curiosity and eccentric habits\./,
    /Goblins are a short, scrappy, energetic people who have spent millennia maligned and feared\./,
    /Halflings are a short, resilient people who exhibit remarkable curiosity and humor\./,
    /Humans are diverse and adaptable people with wide potential and deep ambitions\./,
    /Leshies are immortal nature spirits placed in small plant bodies, seeking to experience the world\./,
    /Orcs are proud, strong people with hardened physiques who value physical might and glory in combat\./
]

export const isWithinSkippableTexts = (textContent: string): boolean => {
    return SkippableTexts.some(regex => regex.test(textContent));
}

export class SkippableText extends NethysComponent {

    constructor() {
        super(
            [
                (node) => isWithinSkippableTexts(node.textContent?.trim() || "")
            ]
        )
    }

}

export const skippableText = new SkippableText();