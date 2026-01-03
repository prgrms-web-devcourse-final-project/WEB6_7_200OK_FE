import { expose, type ProxyMarked } from "comlink";

export class AuctionTicker {
  private duration = 5 * 60 * 1000;

  private expiryAt = 0;

  private intervalId: number | null = null;

  start(onTick: ProxyMarked, onExpiry: ProxyMarked, initDiff: number, durationMs = 5 * 60 * 1000) {
    this.stop();

    this.duration = durationMs - initDiff;
    this.expiryAt = Date.now() + this.duration;
    this.intervalId = globalThis.self.setInterval(() => {
      const remainMs = Math.max(0, this.expiryAt - Date.now());
      (onTick as unknown as (remain: number) => void)(remainMs);

      if (remainMs <= 0) {
        (onExpiry as unknown as () => void)?.();
        this.expiryAt = Date.now() + durationMs;
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

expose(new AuctionTicker());
