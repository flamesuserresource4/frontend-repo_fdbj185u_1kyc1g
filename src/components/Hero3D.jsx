import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <section className="relative h-[320px] sm:h-[420px] rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900">
      <Spline scene="https://prod.spline.design/nFjSBXHSRBbCwMEC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-neutral-950/80"></div>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold">Observe your system in realtime</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">Live metrics, streaming activity, and a cross-tab chat demo. Open this page in two browser tabs to see messages sync instantly.</p>
      </div>
    </section>
  );
}
