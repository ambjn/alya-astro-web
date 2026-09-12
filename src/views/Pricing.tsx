import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { AppleIcon } from "../components/DownloadButton";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { ANIMATION_EASE as ease, APP_STORE_URL, COMPARE_LINKS } from "../constants";

type BillingCycle = "monthly" | "annual";

const plans: Array<{
  id: BillingCycle;
  label: string;
  price: string;
  cadence: string;
  detail: string;
  badge?: string;
}> = [
    { id: "monthly", label: "Monthly", price: "$4.99", cadence: "/ month", detail: "Flexible, billed every month" },
    { id: "annual", label: "Annual", price: "$29.99", cadence: "/ year", detail: "$2.50 / month, billed yearly", badge: "Save 50%" },
  ];

const Pricing = ({ currentPath }: { currentPath?: string }) => {
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const activePlan = plans.find((plan) => plan.id === billing)!;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen font-sans bg-lime-50">
        <NavBar currentPath={currentPath} />

        <main className="mx-auto max-w-4xl px-4 sm:px-6">
          <section className="pb-16 pt-28 text-center sm:pb-20 sm:pt-36">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
              className="mx-auto max-w-3xl"
            >
              <h1 className="mb-5 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-900 sm:text-6xl">
                free to download.<br />
                <span className="text-lime-600">plus to keep scrolling.</span>
              </h1>
              <p className="mx-auto max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg">
                unlimited spanish immersion, with a 7-day free trial for eligible new users.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease }}
              className="mx-auto mt-10 max-w-2xl"
            >
              <div role="radiogroup" aria-label="Choose a billing plan" className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
                {plans.map((plan) => {
                  const isActive = plan.id === billing;

                  return (
                    <button
                      key={plan.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setBilling(plan.id)}
                      className={`group relative min-h-40 rounded-2xl border p-6 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 focus-visible:ring-offset-[#f4f0e7] sm:p-7 ${isActive
                        ? "border-lime-500 bg-white shadow-[0_12px_32px_rgba(59,61,47,0.10)]"
                        : "border-neutral-900/10 bg-white/55 hover:-translate-y-0.5 hover:border-neutral-900/20 hover:bg-white/80"
                        }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-neutral-700">{plan.label}</span>
                        <span
                          aria-hidden="true"
                          className={`grid size-5 place-items-center rounded-full border transition-colors ${isActive ? "border-lime-600 bg-lime-600 text-white" : "border-neutral-300 bg-transparent text-transparent"
                            }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                      </span>

                      <span className="mt-7 flex items-end gap-1.5">
                        <span className="text-4xl font-semibold tracking-[-0.04em] text-neutral-900">{plan.price}</span>
                        <span className="pb-1 text-sm font-medium text-neutral-500">{plan.cadence}</span>
                      </span>

                      <span className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                        {plan.badge && (
                          <span className="rounded-full bg-lime-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-lime-800">
                            {plan.badge}
                          </span>
                        )}
                        <span>{plan.detail}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mx-auto mt-6 max-w-sm">
                <motion.a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-neutral-900 px-7 py-4 text-sm font-semibold text-white shadow-[0_6px_0_#a3e635] transition-colors hover:bg-neutral-800 active:translate-y-0.5 active:shadow-[0_4px_0_#a3e635]"
                >
                  <AppleIcon size={17} />
                  Download free on iOS
                </motion.a>
                <p aria-live="polite" className="mt-4 text-sm font-medium text-neutral-700">
                  Then {activePlan.price} {activePlan.cadence}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                  7 days free if eligible · Renews automatically · Cancel anytime
                </p>
              </div>

              <a href="/support" className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 transition-colors hover:text-lime-700">
                Billing, trials &amp; restore <ChevronRight size={13} />
              </a>
            </motion.div>
          </section>

          <section className="border-t border-neutral-900/10 pb-16 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="text-center"
            >
              <p className="mb-5 text-lg font-semibold text-neutral-500">see how Alya compares</p>
              <div className="flex flex-wrap justify-center gap-2.5 px-2 max-w-2xl mx-auto">
                {COMPARE_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-neutral-700 transition-all duration-200 hover:border-lime-400 hover:text-neutral-900 hover:shadow-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
};

export default Pricing;
