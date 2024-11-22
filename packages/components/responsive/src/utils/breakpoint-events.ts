import { type Breakpoint } from "../types";
import { breakpointKeys, breakpoints } from "../constants";

interface BreakpointEventData {
  breakpoint: Breakpoint;
  matches: boolean;
}

type BreakpointEventsUnsubscribe = () => void;

type BreakpointEventsHandler = (data: BreakpointEventData) => void;

class BreakpointEvents {
  private globalListeners: Array<() => void> = [];

  private handlers: BreakpointEventsHandler[] = [];

  private listenTimeout: ReturnType<typeof requestAnimationFrame> | undefined = undefined;

  public destroy = (): void => {
    if (this.listenTimeout) cancelAnimationFrame(this.listenTimeout);
    this.listenTimeout = undefined;
    this.globalListeners.forEach((cb) => {
      cb();
    });
    this.globalListeners = [];
  };

  public subscribe = (handler: BreakpointEventsHandler): BreakpointEventsUnsubscribe => {
    this.destroy();
    this.handlers.push(handler);

    this.listenTimeout = requestAnimationFrame(this.listen);

    return () => {
      this.handlers = this.handlers.filter((i) => i !== handler);
    };
  };

  private readonly listen = (): void => {
    this.globalListeners = breakpointKeys.map((bpKey) => {
      // TODO: reduce number of listeners
      const data = window.matchMedia(`(min-width: ${breakpoints[bpKey]}px)`);

      this.handlers.forEach((handler) => {
        handler({
          breakpoint: bpKey,
          matches: data.matches,
        });
      });

      const listener = (e: MediaQueryListEventMap["change"]): void => {
        this.handlers.forEach((handler) => {
          handler({
            breakpoint: bpKey,
            matches: e.matches,
          });
        });
      };

      data.addEventListener("change", listener);

      return (): void => {
        data.removeEventListener("change", listener);
      };
    });
  };
}

export const breakpointEvents = new BreakpointEvents();
