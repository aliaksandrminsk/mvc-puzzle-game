import { TimerSliderView } from "./TimerSliderView";

export class TimerSliderController {
  protected interval: ReturnType<typeof setInterval> | null = null;
  protected view: TimerSliderView;

  constructor(view: TimerSliderView) {
    this.view = view;
    this.view.setProgress(100);
  }

  start(duration: number) {
    const endTime = Date.now() + duration;
    this.interval = setInterval(() => {
      const millis = endTime - Date.now();
      let value = (100 * millis) / duration;
      if (millis < 0) value = 0;
      this.view.setProgress(value);
    }, 100);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
  }
}
