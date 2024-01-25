import { MouseButtons } from "@/game/enums";

export interface IMouseClickEvent {
    x: number;
    y: number;
    button: MouseButtons;
}